import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import Slider1 from "../../../assets/ImageSlider/image3.jpg";
import Slider2 from "../../../assets/ImageSlider/imageslider.jpg";
import Slider3 from "../../../assets/ImageSlider/imageslider2.jpg";
import Slider4 from "../../../assets/ImageSlider/image3.jpg";
import Slider5 from "../../../assets/ImageSlider/imageslider.jpg";
import Slider6 from "../../../assets/ImageSlider/imageslider2.jpg";

const Slider = () => {

  const whysponsor = [
    { image: Slider1 },
    { image: Slider2 },
    { image: Slider3 },
    { image: Slider4 },
    { image: Slider5 },
    { image: Slider6 },
  ];

  return (
    <div className='bg-black h-[200px] md:h-[250px] lg:h-[300px] pt-[50px] pb-[50px] lg:pt-[100px] lg:pb-[100px]'>
      <Swiper
        spaceBetween={0}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          600: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 0,
          },
        }}
      >
        {whysponsor.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <img 
                src={sponsor.image} 
                alt={`Slide ${index + 1}`} 
                className="w-full h-full rounded-lg animate-spin-slow"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
