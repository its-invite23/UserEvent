
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UserLayout from "../../Layout/UserLayout";
import orgimg01 from '../../../assets/about/orgimg01.jpg'
import orgimg02 from '../../../assets/about/orgimg02.jpg'
import orgimg03 from '../../../assets/about/orgimg03.jpg'
import orgimg04 from '../../../assets/about/orgimg04.jpg'
import abtsignupimg from '../../../assets/about/abt-signup-img.png'
import trustedimg from '../../../assets/about/trustedimg.jpg'
import FAQSection from "./Faq";

export default function About() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);
  return (
    <div className="relative bg-[#000000]">
      <UserLayout>
        <div>
            <div className="">
              <div className="w-layout-grid hero-grid">

                <div className="w-full aboutHeroData mb-[50px] xl:mb-[0]">
                  <div className="max-w-[1330px] mx-auto ">
                    <div data-aos="zoom-in" className="pt-[50px] sm:pt-[100px]  md:pt-[100px] lg:pt-[200px] xl:pt-[300px] px-[15px]">
                      <h2 className="max-w-[100%]  lg:max-w-[360px] mb-[30px] text-[25px] sm:text-[35px]   lg:text-[50px] text-center lg:text-left font-bold text-white leading-[35px] lg:leading-[55px]">You can organize  everything</h2>
                      <p className="max-w-[100%] lg:max-w-[450px] text-[17px] sm:text-[18px] md:text-[20px] text-[#ffffff80]  text-center lg:text-left font-[600]">Craft unforgettable moments with ease and precision using our all-in-one event planning app.</p>
                    </div>
                  </div>
                </div>

                <div className="aboutMainBx">
                  <div className="w-layout-grid abtHeroBx">
                    <div className="frame-image-hero  abtHero1">
                      <img src={orgimg01} alt="img" />
                    </div>

                    <div className="frame-image-hero abtHero2">
                      <img src={orgimg02} alt="img" />
                    </div>

                    <div className="frame-image-hero abtHero3">
                      <img src={orgimg03} alt="img" />
                    </div>

                    <div className="frame-image-hero abtHero4">
                      <img src={orgimg04} alt="img" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-[1330px] mx-auto px-[20px]">
              <div className="flex flex-wrap lg:flex-nowrap gap-[10px] sm:gap-[30px] md:gap-[50px] lg:gap-[100px] mt-[50px] md:mt-[100px] lg:mt-[150px]">
                <div data-aos="zoom-in" className="w-[100%] lg:w-[55%]">
                  <img src={abtsignupimg} alt="img" className="rounded-[10px]" />
                </div>
                <div className="w-[100%] lg:w-[45%] flex flex-col gap-[25px]">
                  <div  data-aos="fade-up" className="w-full flex  items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">+∞</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Hours saved</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Save countless hours on event planning with INVITE—your time, your moments, perfectly organized.</p>
                    </div>
                  </div>

                  <div data-aos="fade-up" className="w-full flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">0</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Fees</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">No costs for service providers to join, and no charges for customers planning their events.</p>
                    </div>
                  </div>


                  <div data-aos="fade-up" className="flex    items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">94%</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Satisfaction rate</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Our app is trusted by event planners and providers alike.</p>
                    </div>
                  </div>


                  <div data-aos="fade-up" className="flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">1</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Seamless experience, everytime</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Enjoy a flawless event planning process from start to finish.</p>
                    </div>
                  </div>

                  <div  data-aos="fade-up" className="flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">24/7</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Support</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Our team is fully committed to making your event truly unforgettable.</p>
                    </div>
                  </div>



                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-[10px] justify-between mt-[80px]">
                <div  data-aos="zoom-in" className="w-[100%] md:w-[55%] lg:w-[60%] xl:w-[64%]">
                  <h2 className="text-[13px] text-[#fff9] uppercase">POWERED BY AI</h2>
                  <h3 className="font-[600] text-[2em] lg:text-[3em] xl:text-[4em] text-[#fff] leading-[1.1] ">Trusted by over an infinity of  service providers around the world</h3>
                </div>
                <div  data-aos="zoom-in" className="w-[100%] md:w-[45%] lg:w-[40%] xl:w-[36%] pl-[0] md:pl-[50px]">
                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5]">Our advanced Generative AI scours global databases, integrating service providers from every corner of the world, allowing you to seamlessly book the best options, wherever you are, whenever you need.</p>
                </div>
              </div>

              <div  data-aos="zoom-in" className="mt-[30px] md:mt-[100px]">
                <img src={trustedimg} alt="" />
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-[10px] justify-between mt-[80px]">
                <div data-aos="zoom-in" className="w-[100%] md:w-[40%] lg:w-[60%] xl:w-[45%]">
                  <h2 className="font-[600] text-[2em] lg:text-[3em] xl:text-[4em] text-[#fff] leading-[1.1]">Our Mission</h2>
                </div>
                <div  data-aos="fade-up" className="w-[100%] md:w-[60%] lg:w-[40%] xl:w-[55%]">
                  <h3 className="text-[1.2em] md:text-[1.8em] text-[#ffffff] font-[600] mb-[20px]">In the business of crafting unforgettable moments</h3>
                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5] mb-[25px] md:mb-[40px]">At INVITE, our mission is to revolutionize event planning by leveraging cutting-edge technology to connect you with the service providers you need on a unified platform. We believe that life is a collection of moments, and celebrating is essential to living. Our platform simplifies planning these moments, making it accessible and effortless for everyone.</p>

                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5] mb-[25px] md:mb-[40px]">We combine Generative AI through the ChatGPT API andGoogle Maps' extensive database, offering an unparalleled range of service providers globally. Whether it’s a small gathering or a grand event, our technology ensures you can find and book the ideal providers anytime, anywhere.</p>
                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5] mb-[25px] md:mb-[40px]">As a B2B2C company, we empower both sides of the event planning process. For service providers, we offer a SaaS solution to streamline operations, manage bookings, generate invoices, and structure offerings effectively. By uniting small businesses on one platform, we boost their visibility and connect them with a broader audience, helping them thrive.</p>
                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5] mb-[25px] md:mb-[40px]">For event planners, INVITE makes finding and booking all necessary service providers easy in one place. Our platform is more than a tool; it's a partner in crafting meaningful moments. We aim to eliminate the stress of organizing events, letting you focus on what truly matters—celebrating life’s milestones.</p>
                  <p className="text-[0.9em] md:text-[1.0em]  lg:text-[1.4em]  text-[#ffffff75] leading-[1.5] mb-[25px] md:mb-[40px]">Driven by excellence and innovation, INVITE is committed to setting new standards in event planning. We’re here to make every celebration extraordinary. Let’s create memorable moments together.</p>
                </div>
              </div>

              <div className="flex flex-wrap md:flex-nowrap gap-[10px] justify-between mt-[30px] md:mt-[70px] lg:mt-[80px]">
                <div data-aos="zoom-in" className="w-[100%] md:w-[40%] lg:w-[50%] xl:w-[45%]">
                  <h2 className="font-[600] text-[2em] text-[#fff] leading-[1.1]">Frequently asked questions</h2>
                </div>
                <div data-aos="fade-up" className="w-[100%] md:w-[60%] lg:w-[50%] xl:w-[55%]">
                    <FAQSection/>
                </div>
              </div>



            </div>
        </div>

      </UserLayout>
    </div>
  );
}
