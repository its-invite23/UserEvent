import eventOptions from '../JSon/event_options.json';

class EventOptionsService {
  getOptionsForEventType(eventType) {
    if (!eventType) return null;
    
    // Find the matching event type in the options
    const options = eventOptions.eventOptions[eventType];
    
    if (!options) return null;

    return {
      foodOptions: options.foodOptions || [],
      venueOptions: options.venueOptions || [],
      activityOptions: options.activityOptions || []
    };
  }
}

export default new EventOptionsService();