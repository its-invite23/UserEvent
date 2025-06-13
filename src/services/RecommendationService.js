import axios from 'axios';

class RecommendationService {
  constructor() {
    this.openaiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.serpApiKey = process.env.REACT_APP_SERPAPI_API_KEY;
  }

  async searchServiceProviders(query, location) {
    try {
      console.log(`Searching SerpAPI with query: "${query}" in location: "${location}"`);
      
      const response = await axios.get(`https://serpapi.com/search`, {
        params: {
          engine: 'google_maps',
          q: `${query} in ${location}`,
          type: 'search',
          api_key: this.serpApiKey
        }
      });
      
      console.log('SerpAPI raw response:', response.data);
      
      // CRITICAL FIX: Check multiple possible array locations in the response
      const data = response.data;
      console.log('Response data structure:', data);
      
      // Try different possible array locations
      let results = [];
      if (Array.isArray(data.local_results)) {
        results = data.local_results;
        console.log('Found results in data.local_results');
      } else if (Array.isArray(data.results)) {
        results = data.results;
        console.log('Found results in data.results');
      } else if (Array.isArray(data.places_results)) {
        results = data.places_results;
        console.log('Found results in data.places_results');
      } else if (Array.isArray(data.organic_results)) {
        results = data.organic_results;
        console.log('Found results in data.organic_results');
      } else {
        console.warn('No valid results array found in response. Available keys:', Object.keys(data));
        console.log('Full response data:', data);
        return [];
      }
      
      console.log(`Successfully extracted ${results.length} results for query: ${query}`);
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
    console.log('Compiling results for providers:', providers);
    
    // CRITICAL: Ensure providers is always an array
    if (!Array.isArray(providers)) {
      console.warn('Providers is not an array, converting:', providers);
      return [];
    }

    const compiled = [];
    for (const provider of providers) {
      try {
        // Create a basic entry even if we can't get detailed info
        const basicEntry = {
          place_id: provider.place_id || provider.data_id || `temp_${Date.now()}_${Math.random()}`,
          name: provider.title || provider.name || 'Unnamed Provider',
          address: provider.address || provider.vicinity || '',
          rating: provider.rating || 0,
          photos: Array.isArray(provider.photos) ? provider.photos : [],
          opening_hours: provider.opening_hours || '',
          price_level: provider.price_level || 0,
          phone: provider.phone || ''
        };

        // Try to get additional details if we have a data_id
        const dataId = provider.data_id;
        if (dataId) {
          const details = await this.getProviderDetails(dataId);
          if (details) {
            basicEntry.phone = details.phone_number || basicEntry.phone;
            basicEntry.reviews = Array.isArray(details.reviews) ? details.reviews : [];
            basicEntry.photos = Array.isArray(details.photos) ? details.photos : basicEntry.photos;
            basicEntry.opening_hours = details.hours || basicEntry.opening_hours;
            basicEntry.rating = details.rating || basicEntry.rating;
          }
        }

        compiled.push(basicEntry);
      } catch (error) {
        console.error('Error processing provider:', provider, error);
        // Still add a basic entry even if processing fails
        compiled.push({
          place_id: provider.place_id || `error_${Date.now()}_${Math.random()}`,
          name: provider.title || provider.name || 'Provider',
          address: provider.address || '',
          rating: 0,
          photos: [],
          opening_hours: '',
          price_level: 0,
          phone: ''
        });
      }
    }
    
    console.log(`Compiled ${compiled.length} results`);
    return compiled;
  }

  async getEventProviders(formData) {
    try {
      console.log('Getting event providers for formData:', formData);
      
      // First get event summary from OpenAI
      const summary = await this.getEventSummary(formData);

      const categories = {
        venue: `${formData.place || 'venues'} ${formData.event_type || ''}`,
        catering: `${Array.isArray(formData.food_eat) ? formData.food_eat.join(' ') : 'catering'} restaurants`,
        activity: Array.isArray(formData.activity) ? formData.activity.join(' ') : 'entertainment',
        other: `${formData.event_type || ''} event services`
      };

      const location = formData.area || 'local area';
      const allResults = {};

      for (const [cat, query] of Object.entries(categories)) {
        try {
          console.log(`Searching for ${cat} with query: "${query}" in location: "${location}"`);
          const providers = await this.searchServiceProviders(query, location);
          
          // CRITICAL: Ensure providers is always an array before processing
          const providersArray = Array.isArray(providers) ? providers : [];
          console.log(`Processing ${providersArray.length} providers for category: ${cat}`);
          
          const detailedInfo = await this.compileResults(providersArray.slice(0, 10));
          
          // CRITICAL: Ensure result is always an array
          allResults[cat] = Array.isArray(detailedInfo) ? detailedInfo : [];
          
          console.log(`Category "${cat}" final results:`, allResults[cat]);
        } catch (error) {
          console.error(`Error processing category ${cat}:`, error);
          allResults[cat] = [];
        }
      }

      console.log('Final compiled results for all categories:', allResults);
      
      // Ensure all categories exist and are arrays
      const finalResults = {
        venue: Array.isArray(allResults.venue) ? allResults.venue : [],
        catering: Array.isArray(allResults.catering) ? allResults.catering : [],
        activity: Array.isArray(allResults.activity) ? allResults.activity : [],
        other: Array.isArray(allResults.other) ? allResults.other : []
      };
      
      console.log('Returning final validated results:', finalResults);
      return finalResults;
    } catch (error) {
      console.error('Error getting event providers:', error);
      // CRITICAL: Always return a valid structure
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
              Food Preferences: ${Array.isArray(formData.food_eat) ? formData.food_eat.join(',') : 'Not specified'}
              Activities: ${Array.isArray(formData.activity) ? formData.activity.join(',') : 'Not specified'}
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