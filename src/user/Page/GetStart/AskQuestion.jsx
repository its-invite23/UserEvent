{/* Update the case 1 in renderStep() function to match the new design */}
case 1:
  return (
    <div className="flex flex-wrap lg:flex-nowrap items-start gap-[20px] md:gap-[40px]">
      <div className="w-full lg:w-[60%]">
        <h2 className="text-[35px] leading-[40px] md:text-[45px] md:leading-[50px] lg:text-[55px] lg:leading-[60px] font-[600] text-white mb-[30px]">
          What event do you want to celebrate?
        </h2>
        
        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button 
            className={`px-4 py-2 rounded-full text-[16px] ${
              formData.eventCategory === 'private' 
                ? 'bg-[#ff0062] text-white' 
                : 'bg-[#1B1B1B] text-[#ffffff8f]'
            }`}
            onClick={() => setFormData(prev => ({...prev, eventCategory: 'private'}))}
          >
            🎉 Private Event
          </button>
          <button 
            className={`px-4 py-2 rounded-full text-[16px] ${
              formData.eventCategory === 'professional' 
                ? 'bg-[#ff0062] text-white' 
                : 'bg-[#1B1B1B] text-[#ffffff8f]'
            }`}
            onClick={() => setFormData(prev => ({...prev, eventCategory: 'professional'}))}
          >
            💼 Professional Event
          </button>
        </div>

        {/* Event Types */}
        <div className="flex flex-wrap gap-3">
          {Object.keys(eventOptions.eventOptions)
            .filter(eventType => {
              if (formData.eventCategory === 'private') {
                return ['Birthday', 'Graduation Party', 'Private Dinner', 'Bachelorette/Bachelor Party', 
                        'Kids Event', 'Baby Shower', 'Holiday Party', 'Anniversary Celebration', 'Wedding']
                        .includes(eventType);
              }
              if (formData.eventCategory === 'professional') {
                return ['Corporate Dinner', 'Afterwork', 'Team-Building Event', 'Exhibition', 
                        'Corporate Retreat', 'Conference', 'Corporate Sports Event', 'Product Launch', 
                        'Networking Event'].includes(eventType);
              }
              return false;
            })
            .map((eventType) => (
              <button
                key={eventType}
                onClick={() => setFormData({ ...formData, event_type: eventType })}
                className={`px-4 py-2 rounded-full text-[16px] transition-all ${
                  formData.event_type === eventType
                    ? 'bg-white text-black'
                    : 'bg-[#1B1B1B] text-white hover:bg-[#2a2a2a]'
                }`}
              >
                {eventType}
              </button>
          ))}
        </div>
      </div>
      <ImageAsk step={step1banner} />
    </div>
  );