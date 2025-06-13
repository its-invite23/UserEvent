import axios from 'axios';

class RecommendationService {
  constructor() {
    this.openaiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.serpApiKey = process.env.REACT_APP_SERPAPI_API_KEY;
  }

  async searchServiceProviders(query, location) {
    try {
      console.log(`Searching for "${query}" in "${location}"`);
      const response = await axios.get(`https://serpapi.com/search`, {
        params: {
          engine: 'google_maps',
          q: `${query} in ${location}`,
          type: 'search',
          api_key: this.serpApiKey
        }
      });
      
      // Safety check: ensure we extract the correct array from the response
      const results = response.data?.local_results || response.data?.results || [];
      
      if (!Array.isArray(results)) {
        console.warn('SerpAPI response does not contain a valid results array:', response.data);
        return [];
      }
      
      console.log(`Found ${results.length} results for "${query}" in "${location}"`);
      return results;
    } catch (error) {
      console.error('Error searching providers:', error);
      return [];
    }
  }

  async getProviderDetails(dataId) {
    try {
      const response = await axios.get(`https://serpapi.com/search`, {
        params: {
          engine: 'google_maps_place',
          data_id: dataId,
          api_key: this.serpApiKey
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error getting provider details:', error);
      return null;
    }
  }

  async compileResults(providers) {
    if (!Array.isArray(providers)) {
      console.warn('Providers is not an array:', providers);
      return [];
    }

    const compiled = [];
    for (const provider of providers) {
      const dataId = provider.data_id || provider.place_id;
      if (!dataId) continue;
      
      try {
        // Create a basic result even without details
        const basicResult = {
          place_id: provider.place_id || `temp_${Date.now()}_${Math.random()}`,
          name: provider.title || provider.name || 'Unnamed Provider',
          address: provider.address || provider.vicinity || '',
          rating: provider.rating || 0,
          price_level: provider.price_level || 0,
          photos: provider.photos || [],
          types: provider.types || []
        };
        
        // Try to get additional details
        const details = await this.getProviderDetails(dataId);
        if (details) {
          compiled.push({
            ...basicResult,
            phone: details.phone_number || '',
            reviews: details.reviews || [],
            photos: details.photos || provider.photos || [],
            opening_hours: details.hours || provider.opening_hours || ''
          });
        } else {
          // If details fetch fails, still include the basic result
          compiled.push(basicResult);
        }
      } catch (error) {
        console.error(`Error processing provider ${provider.name || 'unknown'}:`, error);
        // Continue with next provider
      }
    }
    return compiled;
  }

  async getEventProviders(formData) {
    try {
      // First get event summary from OpenAI
      const summary = await this.getEventSummary(formData);
      console.log("Event summary:", summary);

      const categories = {
        venue: `${formData.place || 'venues'} ${formData.event_type || ''}`,
        catering: `${formData.food_eat?.join(' ') || 'catering'} restaurants`,
        activity: formData.activity?.join(' ') || 'entertainment',
        other: `${formData.event_type || ''} event services`
      };

      const location = formData.area || 'local area';
      const allResults = {};

      for (const [cat, query] of Object.entries(categories)) {
        console.log(`Searching for ${cat} with query: ${query} in ${location}`);
        try {
          const providers = await this.searchServiceProviders(query, location);
          
          // Safety check: ensure providers is an array before slicing
          const providersToProcess = Array.isArray(providers) ? providers.slice(0, 10) : [];
          console.log(`Found ${providersToProcess.length} ${cat} providers to process`);
          
          const detailedInfo = await this.compileResults(providersToProcess);
          allResults[cat] = detailedInfo;
        } catch (categoryError) {
          console.error(`Error processing category ${cat}:`, categoryError);
          allResults[cat] = []; // Set empty array for failed category
        }
      }

      console.log('Final compiled results:', allResults);
      return allResults;
    } catch (error) {
      console.error('Error getting event providers:', error);
      // Return empty structure instead of throwing
      return {
        venue: [],
        catering: [],
        activity: [],
        other: []
      };
    }
  }

  async getEventSummary(formData) {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-4",
          messages: [{
            role: "user",
            content: `Summarize the key requirements for this event:
              Event Type: ${formData.event_type || 'Not specified'}
              Number of Attendees: ${formData.people || 'Not specified'}
              Date: ${formData.day || 'DD'}-${formData.month || 'MM'}-${formData.year || 'YYYY'}
              Location: ${formData.area || 'Not specified'}
              Food Preferences: ${formData.food_eat?.join(',') || 'Not specified'}
              Activities: ${formData.activity?.join(',') || 'Not specified'}
              Venue Type: ${formData.place || 'Not specified'}
              Budget Range: ${formData.budget || 'Not specified'}`
          }],
          temperature: 0.7
        },
        {
          headers: {
            'Authorization': `Bearer ${this.openaiKey}`,
            'Content-Type': 'application/json'
          }
        }
      );

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error getting event summary:', error);
      return '';
    }
  }
}

export default new RecommendationService();