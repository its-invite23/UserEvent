import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/formSlice';
import eventOptions from '../../../JSon/All.json';

export default function AskQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    event_type: '',
    food_eat: [],
    activity: [],
    place: [],
    // ... other form fields
  });

  const [availableOptions, setAvailableOptions] = useState({
    food: [],
    venue: [],
    activity: []
  });

  // Update available options when event type changes
  useEffect(() => {
    if (formData.event_type) {
      let options;
      if (eventOptions.eventOptions.privateEvents[formData.event_type]) {
        options = eventOptions.eventOptions.privateEvents[formData.event_type];
      } else if (eventOptions.eventOptions.professionalEvents[formData.event_type]) {
        options = eventOptions.eventOptions.professionalEvents[formData.event_type];
      }

      if (options) {
        setAvailableOptions({
          food: options.food || [],
          venue: options.venue || [],
          activity: options.activity || []
        });
      }
    }
  }, [formData.event_type]);

  const handleEventTypeChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when event type changes
      food_eat: [],
      activity: [],
      place: []
    }));
  };

  const handleMultiSelect = (e, field) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateData(formData));
    navigate('/event-show');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[800px] mx-auto p-4">
      {/* Event Type Selection */}
      <div className="mb-6">
        <label className="block text-white text-sm font-bold mb-2">
          What event do you want to celebrate?
        </label>
        <select
          name="event_type"
          value={formData.event_type}
          onChange={handleEventTypeChange}
          className="w-full bg-[#1B1B1B] text-white p-3 rounded"
          required
        >
          <option value="">Select an event type</option>
          {Object.keys(eventOptions.eventOptions.privateEvents).map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
          {Object.keys(eventOptions.eventOptions.professionalEvents).map(event => (
            <option key={event} value={event}>{event}</option>
          ))}
        </select>
      </div>

      {/* Food Options */}
      {formData.event_type && (
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            What type of food will you eat?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableOptions.food.map(option => (
              <label key={option} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.food_eat.includes(option)}
                  onChange={(e) => handleMultiSelect(e, 'food_eat')}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Activity Options */}
      {formData.event_type && (
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            What fun experience would you like to add?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableOptions.activity.map(option => (
              <label key={option} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.activity.includes(option)}
                  onChange={(e) => handleMultiSelect(e, 'activity')}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Venue Options */}
      {formData.event_type && (
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            What place do you want to get?
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableOptions.venue.map(option => (
              <label key={option} className="flex items-center text-white">
                <input
                  type="checkbox"
                  value={option}
                  checked={formData.place.includes(option)}
                  onChange={(e) => handleMultiSelect(e, 'place')}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          className="bg-[#ff0062] hover:bg-[#4400c3] text-white font-bold py-2 px-4 rounded"
        >
          Continue
        </button>
      </div>
    </form>
  );
}