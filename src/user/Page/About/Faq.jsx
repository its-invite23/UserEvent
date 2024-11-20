import React, { useState } from 'react';

const FAQSection = () => {
  const faqData = [
    {
      question: "How does INVITE work?",
      answer:
        "1️. Imagine your dream event and share your vision with us by filling out our simple form. ✨",

        answer1:
        "2️. Our smart system takes it from there, researching and curating personalized suggestions just for you. 🔍",

        answer2:
        "3️. Choose the service providers that fit your needs and submit your selection for a quote. 📝",

        answer3:
        "4️. We handle all the details with the service providers—no stress, no hassle. 🤝",

        answer4:
        "5️. You'll receive a payment link from us. 💳",

        answer5:
        "6️. Then, it's time to celebrate your perfectly planned event! 🎉",

    },
    {
      question: "What types of events can I plan on INVITE?",
      answer:
      "You can plan anything your heart desires! 💖 Whether it’s a wedding 💍, birthday 🎂, corporate event 🏢, or a casual get-together 🍻, our platform tailors suggestions to bring your vision to life. 🎨",
      
    },

    {
        question: "What are the costs?",
        answer:
        "There are no hidden fees—ever! 🚫💰 Service providers can showcase their offerings for free 🎉, and event planners don’t pay a cent to use our platform. Once you receive your quote, everything is transparent 🧾, so you know exactly what you’re paying for. ✅",
        
      },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="">
      <div className="">
        
        <div className="">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="border-b-[1px] border-b-[#ffffff45]  "
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="relative w-full text-left py-[20px] pr-[43px] text-[1.1rem] md:text-[1.5rem] lg:text-[1.8rem] text-white font-[600] flex justify-between items-center focus:outline-none"
              >
                <span className="">{item.question}</span>
                <svg width="34" height="34"  className={`text-[20px] md:text-[40px] absolute top-[0] bottom-[0] m-auto right-[10px] w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]  md:w-[34px] lg:h-[34px] transition-transform ${
                    activeIndex === index ? "rotate-[45deg]" : ""}`} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="14" width="34" height="5" fill="white"/>
                    <rect x="14" y="34" width="34" height="5" transform="rotate(-90 14 34)" fill="white"/>
                </svg>


                
              </button>
              {activeIndex === index && (
                <ul>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer}</li>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer1}</li>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer2}</li>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer3}</li>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer4}</li>
                    <li className="py-3 text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-[500]">{item.answer5}</li>
                </ul>

              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
