import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay } from 'swiper/modules'; 
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import providerlogo01 from "../../../assets/event/providerlogo01.webp";
import providerlogo02 from "../../../assets/event/providerlogo02.png";
import providerlogo03 from "../../../assets/event/providerlogo03.png";
import providerlogo04 from "../../../assets/event/providerlogo04.png";
import providerlogo05 from "../../../assets/event/providerlogo05.png";
import providerlogo06 from "../../../assets/event/providerlogo06.png";
import providerlogo07 from "../../../assets/event/providerlogo07.png";
import providerlogo08 from "../../../assets/event/providerlogo08.svg";
import providerlogo09 from "../../../assets/event/providerlogo09.png";
import providerlogo10 from "../../../assets/event/providerlogo10.png";
import providerlogo11 from "../../../assets/event/providerlogo11.png";
import providerlogo12 from "../../../assets/event/providerlogo12.png";

const Slider = () => {

  const whysponsor = [
    { image: providerlogo01 },
    { image: providerlogo02 },
    { image: providerlogo03 },
    { image: providerlogo04 },
    { image: providerlogo05 },
    { image: providerlogo06 },
    { image: providerlogo07 },
    { image: providerlogo08 },
    { image: providerlogo09 },
    { image: providerlogo10 },
    { image: providerlogo11 },
    { image: providerlogo12 },
  ];

  return (
    <div className='bg-black h-[200px] md:h-[250px] lg:h-[300px] pt-[50px] pb-[50px] lg:pt-[100px] lg:pb-[100px]'>
      <Swiper
        spaceBetween={0}
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 5000,
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
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
      >
        {whysponsor.map((sponsor, index) => (
          <SwiperSlide key={index}>
            <div className="p-4">
              <img src={sponsor.image} alt={`Slide ${index + 1}`} className="max-w-[130px] max-h-[45px] object-cover rounded-lg" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
