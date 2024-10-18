import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import 'swiper/css';
import Slider1 from "../../../assets/slider/Slider1.png";
import Slider2 from "../../../assets/slider/Slider2.png";
import Slider3 from "../../../assets/slider/Slider3.png";
import Slider4 from "../../../assets/slider/Slider4.png";
import Slider5 from "../../../assets/slider/Slider5.png";
import Slider6 from "../../../assets/slider/Slider6.png";
import Slider7 from "../../../assets/slider/Slider7.png";
import Slider8 from "../../../assets/slider/Slider8.png";
import Slider9 from "../../../assets/slider/Slider9.png";
import Slider10 from "../../../assets/slider/Slider10.png";
import Slider11 from "../../../assets/slider/Slider11.png";
import Slider12 from "../../../assets/slider/Slider12.png";

const Slider = () => {
  const totalSlides = 6; 

  const whysponsor = [
    { image: Slider1 },
    { image: Slider2 },
    { image: Slider3 },
    { image: Slider4 },
    { image: Slider5 },
    { image: Slider6 },
    { image: Slider7 },
    { image: Slider8 },
    { image: Slider9 },
    { image: Slider10 },
    { image: Slider11 },
    { image: Slider12 },
  ];

  return (
    <div className='bg-black h-[400px] '>
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}     
      slidesPerView={1}     
      autoplay={{ delay: 3000 }}  
      loop={true}  
      breakpoints={{
        1024: {  
          slidesPerView: totalSlides,   
          spaceBetween: 30,  
        },
      }}
    >
      {whysponsor.map((sponsor, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 ">
            <img src={sponsor.image} alt={`Slide ${index + 1}`} className="w-[250px] h-[300px] rounded-lg" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
  );
};

export default Slider;
