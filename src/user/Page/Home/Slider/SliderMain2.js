import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider1 from "../../../../assets/ImageSlider/Slider2/Slider1.jpg";
import Slider2 from "../../../../assets/ImageSlider/Slider2/Slider2.jpg";
import Slider3 from "../../../../assets/ImageSlider/Slider2/Slider3.jpg";
import Slider4 from "../../../../assets/ImageSlider/Slider2/Slider4.jpg";
import Slider5 from "../../../../assets/ImageSlider/Slider2/Slider5.jpg";
import Slider6 from "../../../../assets/ImageSlider/Slider2/Slider6.jpg";
import Slider7 from "../../../../assets/ImageSlider/Slider2/Slider7.jpg";
import Slider8 from "../../../../assets/ImageSlider/Slider2/Slider8.jpg";
import Slider9 from "../../../../assets/ImageSlider/Slider2/Slider9.jpg";
import CardFlipX from "./CardFlipX";
import CardFlipY from "./CardFlipY";

export default function SliderMain2() {
  // const sliderRef = useRef(null);
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (sliderRef.current) {
  //       if (document.hidden) {
  //         sliderRef.current.slickPause(); // Pause the slider when the tab is inactive
  //       } else {
  //         sliderRef.current.slickPlay(); // Resume the slider when the tab is active
  //       }
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);

  //   return () => {
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //   };
  // }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: false,
    speed: 5000,
    autoplaySpeed: 1000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1199, // At 1024px or below
        settings: {
          speed: 6000,
          slidesToShow: 3, // Show 2 slides
          slidesToScroll: 1, // Scroll 1 slide at a time
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 991, // At 768px or below
        settings: {
          speed: 6000,
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
          <CardFlipX imgsrc={Slider2} />
        </div>
        <div className="px-[10px]">
          <CardFlipY imgsrc={Slider3} />
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
          <CardFlipX imgsrc={Slider7} />
        </div>
        <div className="px-[10px]">
          <CardFlipY imgsrc={Slider8} />
        </div>
        <div className="px-[10px]">
          <CardFlipX imgsrc={Slider9} />
        </div>
      </Slider>
    </div>
  );
}
