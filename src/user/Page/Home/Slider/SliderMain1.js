import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from "../../../../assets/ImageSlider/Slider1/Slider1.jpg";
import Slider2 from "../../../../assets/ImageSlider/Slider1/Slider2.jpg";
import Slider3 from "../../../../assets/ImageSlider/Slider1/Slider3.jpg";
import Slider4 from "../../../../assets/ImageSlider/Slider1/Slider4.jpg";
import Slider5 from "../../../../assets/ImageSlider/Slider1/Slider5.jpg";
import Slider6 from "../../../../assets/ImageSlider/Slider1/Slider6.jpg";
import Slider7 from "../../../../assets/ImageSlider/Slider1/Slider7.jpg";
import Slider8 from "../../../../assets/ImageSlider/Slider1/Slider8.jpg";
import Slider9 from "../../../../assets/ImageSlider/Slider1/Slider9.jpg";
import CardFlipX from "./CardFlipX";
import CardFlipY from "./CardFlipY";

export default function SliderMain1() {
  const settings = {
    dots: false,
    arrows:false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 0,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1199, // At 1024px or below
        settings: {
          slidesToShow: 3, // Show 2 slides
          slidesToScroll: 1, // Scroll 1 slide at a time
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991, // At 768px or below
        settings: {
          slidesToShow: 2, // Show 1 slide
          slidesToScroll: 1,
        }
      },
    ],
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider1} />
        </div>

        <div className="px-[10px]">
          <CardFlipY imgsrc={Slider2} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider3} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider4} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider5} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider6} />
        </div>

        <div className="px-[10px]">
          <CardFlipY imgsrc={Slider7} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider8} />
        </div>

        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider9} />
        </div>
      </Slider>
    </div>
  );
}
