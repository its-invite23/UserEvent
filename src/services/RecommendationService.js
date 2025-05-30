import axios from 'axios';

class RecommendationService {
  constructor() {
    this.openaiKey = process.env.REACT_APP_OPENAI_API_KEY;
    this.serpApiKey = process.env.REACT_APP_SERPAPI_API_KEY;
  }

  async searchServiceProviders(query, location) {
    try {
      const response = await axios.get(`https://serpapi.com/search`, {
        params: {
          engine: 'google_maps',
          q: `${query} in ${location}`,
          type: 'search',
          api_key: this.serpApiKey
        }
      });
      return response.data.local_results || [];
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
    const compiled = [];
    for (const provider of providers) {
      const dataId = provider.data_id;
      if (!dataId) continue;
      
      const details = await this.getProviderDetails(dataId);
      if (details) {
        compiled.push({
          name: provider.title,
          address: provider.address,
          phone: details.phone_number,
          rating: details.rating,
          reviews: details.reviews,
          photos: details.photos,
          opening_hours: details.hours
        });
      }
    }
    return compiled;
  }

  async getEventProviders(formData) {
    try {
      await this.getEventSummary(formData);

      const categories = {
        food: `${formData.food_eat?.join(',')} restaurants`,
        venue: formData.place,
        activities: formData.activity?.join(','),
        other: `${formData.event_type} event services`
      };

      const location = formData.area;
      const allResults = {};

      for (const [cat, query] of Object.entries(categories)) {
        console.log(`Searching for ${cat}...`);
        const providers = await this.searchServiceProviders(query, location);
        const detailedInfo = await this.compileResults(providers.slice(0, 10));
        allResults[cat] = detailedInfo;
      }

      return allResults;
    } catch (error) {
      console.error('Error getting event providers:', error);
      throw error;
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
              Event Type: ${formData.event_type}
              Number of Attendees: ${formData.people}
              Date: ${formData.day}-${formData.month}-${formData.year}
              Location: ${formData.area}
              Food Preferences: ${formData.food_eat?.join(',')}
              Activities: ${formData.activity?.join(',')}
              Venue Type: ${formData.place}
              Budget Range: ${formData.budget}`
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

const recommendationService = new RecommendationService();
export default recommendationService;