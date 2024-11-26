// import React from "react"
import React, { useEffect } from "react";
import UserLayout from "../../Layout/UserLayout";
import AOS from "aos";
import "aos/dist/aos.css";
import eventorganizer from "../../../assets/event/eventorganizer.jpg";
import providersbg from "../../../assets/event/Servicesprovide.jpg";
import arrowwh from "../../../assets/event/arrowwh.svg";
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
import { Link } from "react-router-dom";
import EventTab from "./EventTab";

export default function Organiser() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <div className="bg-[#000] h-full min-h-full">
      <UserLayout>
        <div className="">
          <div className=" w-full max-w-[950px] m-auto pt-[60px] lg:pt-[100px] mb-[80px] px-[15px]">
            <h1 className="text-[30px] md:text-[80px] lg:text-[90px] text-center text-white font-[700] mb-[20px] md:mb-[40px]">
              Imagine. <span className="scribble">Plan</span>. Book.
            </h1>
            <p className="text-center text-[#ffffff80] text-[1.1em] md:text-[1.4em]">
              Explore INVITE today and start turning your event ideas into
              reality. Whether you’re planning months in advance or just days
              away, we’re here to help you create something truly special.
            </p>

            <div
              data-aos="zoom-in" className="w-full max-w-[580px] m-auto mt-[60px] md:mt-[120px] lg:mt-[150px]">
              <h2 className="text-[1.4em] leading-[1.1em] md:text-[2em] md:leading-[1.2em] text-white text-center font-[600] mb-[20px]">
                Get started with INVITE
              </h2>
              <p className="mb-[40px] text-[#ffffff75] text-[1.1em] leading-[1.1] md:text-[1.4em] md:leading-[1.5] text-center">
                Discover top event providers and start planning your perfect
                celebration today.
              </p>
              <div className="text-center">
                <Link
                  href="/"
                  className="px-[35px] py-[17px] rounded-[5px] bg-[#ff0062] hover:bg-[#4400c3] text-white text-[18px] font-[500]"
                >
                  Organize your event
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full max-w-[1330px] m-auto mb-[50px] px-[15px]">
            <div data-aos="zoom-in" className="mb-[40px]">
              <img src={eventorganizer} alt="img" />
            </div>
            <div className="grid grid-cols-1  sm:grid-cols-2 xl:grid-cols-4 gap-[20px]">
              <div data-aos="fade-down"data-aos-easing="linear"data-aos-duration="1500" className="">
                <h2 className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-[500]">
                  Birthdays
                </h2>
                <p className="text-[16px] text-[#ffffff80]">
                  Make your birthday special with effortless planning. Whether
                  small or grand, INVITE helps you create a day full of joy and
                  memories.
                </p>
              </div>

              <div data-aos="fade-down"data-aos-easing="linear"data-aos-duration="1500" className="">
                <h2 className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-[500]">
                  Casual Parties
                </h2>
                <p className="text-[16px] text-[#ffffff80]">
                  Host a casual party with ease. INVITE connects you with the
                  right services to set the perfect mood, so you can enjoy the
                  moment.
                </p>
              </div>

              <div data-aos="fade-down"data-aos-easing="linear"data-aos-duration="1500" className="">
                <h2 className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-[500]">
                  Afterworks
                </h2>
                <p className="text-[16px] text-[#ffffff80]">
                  Elevate your afterwork gatherings. From venues to catering,
                  INVITE ensures your team unwinds and connects in the perfect
                  setting.
                </p>
              </div>

              <div data-aos="fade-down"data-aos-easing="linear"data-aos-duration="1500" className="">
                <h2 className="text-white text-[20px] md:text-[28px] lg:text-[32px] font-[500]">
                  Kids events
                </h2>
                <p className="text-[16px] text-[#ffffff80]">
                  Create magical moments for your little ones. INVITE helps you
                  plan fun, stress-free kids’ events, bringing their dreams to
                  life.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap md:flex-nowrap w-full max-w-[1920px] mt-[50px] md:mt-[100px] m-auto flex items-center">
            <div data-aos="zoom-in" className="w-[100%] md:w-[50%] px-[15px] md:px-[0]">
              <img src={providersbg} alt="img" />
            </div>
            <div  data-aos="zoom-in" className="w-[100%] md:w-[50%] mt-[40px] md:mt-[0]">
              <div className="max-w-[700px] pl-[15px] md:pl-[40px] lg:pl-[80px] xl:pl-[150px] pr-[10px] md:pr-[50px]">
                <p className="text-[#ffffff80] text-[1.1em] leading-[1.2] md:text-[1.2em] md:leading-[1.2] lg:text-[1.3em] lg:leading-[1.4] xl:text-[2em] xl:leading-[1.6]">
                  With INVITE, save time by effortlessly coordinating every
                  event detail. Our flexible app lets you plan anything, from
                  small gatherings to grand celebrations. Customize
                  everything—with every type of service provider just a few
                  clicks away. Say goodbye to stress and enjoy perfectly
                  tailored celebrations.
                </p>

                <div className="mt-[20px] md:mt-[50px]">
                  <Link
                    to="#"
                    className="flex items-center gap-[8px] text-[#ffffffd9] text-[16px] font-[500] hover:gap-[15px] transition-all duration-200"
                  >
                    Learn more <img className="w-[15px]" src={arrowwh} alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1320px] m-auto mt-[60px] md:mt-[150px] px-[15px]">
            <h2 className="text-white text-[20px] lg:text-[30px]  font-[600] text-center mb-[40px] lg:mb-[80px]">
              Access every event service provider on the planet—right at your
              fingertips.
            </h2>
            <div className="grid grid-rows-2 md:grid-rows-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-[20px] md:gap-[80px] justify-center">
              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo01}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo02}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo03}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo04}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo05}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo06}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo07}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo08}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo09}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo10}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo11}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>

              <div data-aos="zoom-in" className="flex justify-center">
                <img
                  src={providerlogo12}
                  alt=""
                  className="max-w-[110px] max-h-[35px]"
                />
              </div>
            </div>
          </div>

          <div data-aos="zoom-in" className="max-w-[1400px] m-auto mt-[50px] md:mt-[150px] px-[15px]">
            <EventTab />
          </div>
          <div className="overflow-hidden">
            <div className="TrickySliderMain mt-[40px] md:mt-[100px]">
              <div className="trickybx">
                <div className="TrickySlider">
                  <div>
                    Effortless event Planning - Powered by AI - Tailored
                    Solutions for Every Occasion -
                  </div>

                  <div>
                    Effortless event Planning - Powered by AI - Tailored
                    Solutions for Every Occasion -
                  </div>

                  <div>
                    Effortless event Planning - Powered by AI - Tailored
                    Solutions for Every Occasion -
                  </div>

                  <div>
                    Effortless event Planning - Powered by AI - Tailored
                    Solutions for Every Occasion -
                  </div>

                  <div>
                    Effortless event Planning - Powered by AI - Tailored
                    Solutions for Every Occasion -
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div data-aos="zoom-in" className="w-full max-w-[580px] m-auto mt-[20px] md:mt-[100px] mb-[20px] md:mb-[180px] px-[15px]">
              <h2 className="text-[1.4em] leading-[1.1em] md:text-[2em] md:leading-[1.2em] text-white text-center font-[600] mb-[20px]">
              Get started with INVITE
              </h2>
              <p className="mb-[40px] text-[#ffffff75] text-[1.1em] leading-[1.1] md:text-[1.4em] md:leading-[1.5] text-center">
              Discover top event providers and start planning your perfect celebration today.
              </p>
              <div className="text-center">
                <Link
                  to="#"
                  className="px-[35px] py-[17px] rounded-[5px] bg-[#ff0062] hover:bg-[#4400c3] text-white text-[18px] font-[500]"
                >
                  Organize your event
                </Link>
              </div>
            </div>
        </div>
      </UserLayout>
    </div>
  );
}
