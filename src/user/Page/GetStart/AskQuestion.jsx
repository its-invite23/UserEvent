import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateData } from '../Redux/formSlice';
import EventOptionsService from '../../../services/EventOptionsService';
import ImageAsk from './ImageAsk';
import NextPreBtn from './NextPreBtn';
import ProgressBar from './ProgressBar';

// Import step images
import step1 from '../../../assets/step1banner.jpg';
import step2 from '../../../assets/step2banner.jpg';
import step3 from '../../../assets/step3banner.jpg';
import step4 from '../../../assets/step4banner.jpg';
import step5 from '../../../assets/step5banner.jpg';
import step6 from '../../../assets/step6banner.jpg';
import step7 from '../../../assets/step7banner.png';
import step8 from '../../../assets/step8banner.png';
import step9 from '../../../assets/step9banner.png';
import step10 from '../../../assets/step10banner.jpg';

export default function AskQuestion() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    event_type: '',
    people: '',
    day: '',
    month: '',
    year: '',
    time: '',
    area: '',
    food_eat: [],
    activity: [],
    place: '',
    Privatize_place: '',
    Privatize_activity: '',
    budget: '',
    details: ''
  });

  // Dynamic options based on event type
  const [dynamicOptions, setDynamicOptions] = useState({
    foodOptions: [],
    venueOptions: [],
    activityOptions: []
  });

  useEffect(() => {
    if (formData.event_type) {
      const options = EventOptionsService.getOptionsForEventType(formData.event_type);
      if (options) {
        setDynamicOptions(options);
      }
    }
  }, [formData.event_type]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMultiSelect = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value) 
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    dispatch(updateData(formData));
    navigate('/event-show');
  };

  const getStepImage = () => {
    switch(currentStep) {
      case 1: return step1;
      case 2: return step2;
      case 3: return step3;
      case 4: return step4;
      case 5: return step5;
      case 6: return step6;
      case 7: return step7;
      case 8: return step8;
      case 9: return step9;
      case 10: return step10;
      default: return step1;
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What event do you want to celebrate?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Birthday 🎉",
                "Graduation Party 🎓",
                "Private Dinner 🍽️",
                "Bachelorette/Bachelor Party 💃🕺",
                "Kids Event 🧸",
                "Baby Shower 👶",
                "Anniversary Celebration 💍",
                "Holiday Party (Halloween, Christmas, New Year) 🎄🎃🎆",
                "Wedding 👰",
                "Corporate Dinner 🍴",
                "Afterwork 🍻",
                "Exhibition 🖼️",
                "Team-Building Event 🤝",
                "Corporate Retreat 🏞️",
                "Conference 📚",
                "Corporate Sports Event 🏅",
                "Product Launch 🚀",
                "Networking Event 🤝"
              ].map((event, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    formData.event_type === event
                      ? 'bg-[#ff0062] text-white'
                      : 'bg-[#1B1B1B] text-white hover:bg-[#4400c3]'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'event_type', value: event }})}
                >
                  {event}
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              How many people will attend?
            </h2>
            <input
              type="number"
              name="people"
              value={formData.people}
              onChange={handleInputChange}
              className="w-full p-4 bg-[#1B1B1B] text-white rounded-lg"
              placeholder="Enter number of attendees"
            />
          </div>
        );

      case 3:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              When is your event?
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <input
                type="text"
                name="day"
                placeholder="DD"
                value={formData.day}
                onChange={handleInputChange}
                className="p-4 bg-[#1B1B1B] text-white rounded-lg"
              />
              <input
                type="text"
                name="month"
                placeholder="MM"
                value={formData.month}
                onChange={handleInputChange}
                className="p-4 bg-[#1B1B1B] text-white rounded-lg"
              />
              <input
                type="text"
                name="year"
                placeholder="YYYY"
                value={formData.year}
                onChange={handleInputChange}
                className="p-4 bg-[#1B1B1B] text-white rounded-lg"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What time will it be?
            </h2>
            <select
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-4 bg-[#1B1B1B] text-white rounded-lg"
            >
              <option value="">Select time</option>
              <option value="Morning">Morning 🌅</option>
              <option value="Noon">Noon 🕛</option>
              <option value="Afternoon">Afternoon 🌇</option>
              <option value="Evening">Evening 🌃</option>
              <option value="Full day">Full day 📅</option>
            </select>
          </div>
        );

      case 5:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              Where will it be?
            </h2>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              className="w-full p-4 bg-[#1B1B1B] text-white rounded-lg"
              placeholder="Enter location"
            />
          </div>
        );

      case 6:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What type of food will you eat?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dynamicOptions.foodOptions.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    formData.food_eat.includes(option)
                      ? 'bg-[#ff0062] text-white'
                      : 'bg-[#1B1B1B] text-white hover:bg-[#4400c3]'
                  }`}
                  onClick={() => handleMultiSelect('food_eat', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What fun experience would you like to add?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dynamicOptions.activityOptions.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    formData.activity.includes(option)
                      ? 'bg-[#ff0062] text-white'
                      : 'bg-[#1B1B1B] text-white hover:bg-[#4400c3]'
                  }`}
                  onClick={() => handleMultiSelect('activity', option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What place do you want to get?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {dynamicOptions.venueOptions.map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    formData.place === option
                      ? 'bg-[#ff0062] text-white'
                      : 'bg-[#1B1B1B] text-white hover:bg-[#4400c3]'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'place', value: option }})}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 9:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              What's your budget range?
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                "Budget-friendly places 💰",
                "Mid-range places with good value 💸",
                "Higher-end places 💸💸",
                "Luxury and premium options 🤑🤑"
              ].map((option, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-lg text-left ${
                    formData.budget === option
                      ? 'bg-[#ff0062] text-white'
                      : 'bg-[#1B1B1B] text-white hover:bg-[#4400c3]'
                  }`}
                  onClick={() => handleInputChange({ target: { name: 'budget', value: option }})}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 10:
        return (
          <div className="w-full">
            <h2 className="text-[20px] md:text-[25px] lg:text-[30px] text-white font-[600] mb-[20px]">
              Any additional details?
            </h2>
            <textarea
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              className="w-full p-4 bg-[#1B1B1B] text-white rounded-lg h-32"
              placeholder="Enter any additional details..."
            />
            <button
              onClick={handleSubmit}
              className="mt-4 px-6 py-3 bg-[#ff0062] text-white rounded-lg hover:bg-[#4400c3]"
            >
              Submit
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-7xl mx-auto">
        <ProgressBar progressWidth={(currentStep / 10) * 100} />
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          <div className="w-full lg:w-1/2">
            {renderStep()}
            <div className="mt-8">
              <NextPreBtn
                onPrev={handlePrev}
                onNext={handleNext}
                currentStep={currentStep}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <ImageAsk step={getStepImage()} />
          </div>
        </div>
      </div>
    </div>
  );
}