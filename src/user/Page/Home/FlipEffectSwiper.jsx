import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay} from 'swiper/modules';
import 'swiper/css';
import Slider1 from "../../../assets/ImageSlider/Slider1/Slider1.jpg";
import Slider2 from "../../../assets/ImageSlider/Slider1/Slider2.jpg";
import Slider3 from "../../../assets/ImageSlider/Slider1/Slider3.jpg";
import Slider4 from "../../../assets/ImageSlider/Slider1/Slider1.jpg";
import Slider5 from "../../../assets/ImageSlider/Slider1/Slider2.jpg";
import Slider6 from "../../../assets/ImageSlider/Slider1/Slider3.jpg";

const Slider = () => {
  const [rotationCycle, setRotationCycle] = useState(0); // To track the cycle for rotations

  const whysponsor = [
    { image: Slider1 },
    { image: Slider2 },
    { image: Slider3 },
    { image: Slider4 },
    { image: Slider5 },
    { image: Slider6 },
  ];

  // Update the rotation cycle every 3 seconds (3000ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setRotationCycle((prev) => (prev + 1) % 5); // Loop through 0 to 4 cycles
    }, 3000); // 3 seconds delay between cycles

    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  // Function to handle flip behavior for each cycle
  const getFlipClass = (index) => {
    let flipClass = '';

    if (rotationCycle === 0) {
      flipClass = index % 2 === 0 ? 'rotate-360' : 'rotate-180';
    } else if (rotationCycle === 1) {
      flipClass = index % 2 === 0 ? 'rotate-reverse-180' : 'rotate-180';
    } else if (rotationCycle === 2) {
      flipClass = index % 2 === 0 ? 'rotate-180' : 'rotate-reverse-180';
    } else if (rotationCycle === 3) {
      flipClass = index % 2 === 0 ? 'rotate-180' : 'rotate-360';
    } else if (rotationCycle === 4) {
      // Random mirror reflection for some images
      flipClass = Math.random() > 0.5 ? 'mirror' : '';
    }

    return flipClass;
  };

  return (
    <div className='bg-black h-[200px] md:h-[250px] lg:h-[300px] pt-[50px] pb-[50px] lg:pt-[100px] lg:pb-[100px]'>
      <Swiper
        spaceBetween={20}  // Add space between slides to avoid overlap
        slidesPerView={4}
        loop={true}         // Ensure continuous looping of slides
        autoplay={{
          delay: 3000 ,  // 3 seconds delay between slides
          disableOnInteraction: false, // Keep autoplay running even after manual interactions
        }}
        modules={[Pagination, Navigation, Autoplay]}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,  // Set to 4 images on desktop
            spaceBetween: 20,
          },
        }}
      >
        {whysponsor.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <div className="p-4 relative">
              <img
                src={sponsor.image}
                alt={`Slide ${index + 1}`}
                className={`w-[400px] h-[200px] rounded-lg transition-all duration-500 transform ${getFlipClass(index)}`}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
