import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UserLayout from "../../Layout/UserLayout";
import empower from "../../../assets/service/servicebanner02.png";
import arrowwh from "../../../assets/service/arrowwh.svg";
import iconplay from "../../../assets/service/icon-play.svg";
import toggleicona from "../../../assets/service/toggleicona.svg";
import business from "../../../assets/service/business.jpg";
import facilityimg from "../../../assets/service/facilityimg.png";
import servicebanner from "../../../assets/service/servicebanner.png";
import blastcaterignbanner from "../../../assets/service/blastcaterignbanner.png";
import ContactForm from "./ConntactForm";
import ServiceTabs from "./ServiceTabbing";
import { Link } from "react-router-dom";
import Founder from "../../compontents/Founder";
import CalInvite from "../../compontents/CalInvite";

export default function ServicesProviderHome() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div className="bg-[#000]  h-full min-h-full">
      <UserLayout>
        <div className="relative mt-[30px] md:mt-[40px] lg:mt-[60px] xl:mt-[100px]">
          <div className="flex flex-wrap lg:flex-nowrap xl:block">
            <div className="flex flex-wrap md:flex-nowrap max-w-[1430px] px-[15px] m-auto">
              <div className="max-w-[600px] lg:max-w-[500px] xl:max-w-[600px] pt-[10px] md:pt-[5px] lg:pt-[50px] xl:pt-[20px] ">
                <h2 className="mb-[26px] text-[2em] leading-[1.2em] md:text-[2.5em] md:leading-[1.1em] lg:text-[3.3em] lg:leading-[1.1em]  xl:text-[5.5em] xl:leading-[1.1em] text-white  font-[700] text-center md:text-left">
                  Your AI co-pilot. Built for event pros, running 24/7.
                </h2>
                <p className="max-w-[100%] lg:max-w-[450px] text-[17px] sm:text-[18px] md:text-[18px] lg:text-[20px] text-[#ffffff80]  text-left lg:text-left font-[600]  text-center md:text-left">
                  Invite AI is a dedicated ecosystem for event service providers, 
                  turning your offers, pricing and policies into a 24/7 co-pilot 
                  —so your team can focus on delivering exceptional experiences.
                </p>
                <div className="flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-[15px] lg:gap-[5px] xl:gap-[15px] mt-[40px] md:mt-[60px]">
                  <Link to="https://caterbot-chat.lovable.app/" className="flex items-center gap-[5px] hover:gap-[15px] transition-all text-[18px] md:text-[16px] xl:text-[18px] font-[600] text-white text-center bg-[#ff0062] hover:bg-[#4400c3] px-[15px] py-[10px] md:px-[30px] md:py-[15px] lg:px-[15px] lg:py-[13px] xl:px-[30px] xl:py-[15px] rounded-[5px]">
                  Start my AI copilot trial 
                    <img src={arrowwh} alt="" className="max-w-[18px]" />
                  </Link>
{/*  */}
                  <div
                    className="flex items-center gap-[10px] hover:gap-[15px] transition-all text-[18px] md:text-[16px] xl:text-[18px] font-[600] text-white text-center bg-[#80808033] hover:bg-[#80808059] px-[15px] py-[10px] md:px-[30px] md:py-[15px] lg:px-[15px] lg:py-[13px] xl:px-[30px] xl:py-[15px] rounded-[5px]">
                    View Demo
                    <Link to="https://youtu.be/vOsB4BUtpEE" className="flex items-center gap-[5px] hover:gap-[15px] transition-all text-[18px] md:text-[16px] xl:text-[18px] font-[600] text-white text-center bg-[#ff0062] hover:bg-[#4400c3] px-[15px] py-[10px] md:px-[30px] md:py-[15px] lg:px-[15px] lg:py-[13px] xl:px-[30px] xl:py-[15px] rounded-[5px]"></Link>
                    <img src={iconplay} alt="" className="max-w-[18px]" />
                  </div>
                </div>
              </div>
            </div>
            <div className=" xl:absolute right-[0] top-[0] w-[100%] max-w-[100%] xl:max-w-[50%] mt-[50px] xl:mt-[0]">
              <img
                src={empower}
                alt="img"
                className="max-w-[100%] sm:max-w-[400px] md:max-w-[80%]  lg:max-w-[80%] xl:max-w-[100%] m-auto"
              />
            </div>
          </div>

          <div
            data-aos="zoom-in"
            className="max-w-[550px] m-auto mt-[10px] md:mt-[50px]"
          >
            <h2 className="mb-[10px] md:mb-[20px] text-[25px] md:text-[30px] font-[600] text-white text-center">
              Become an Invite AI Founding Partner
            </h2>
            <p className="text-[#ffffff75] text-[1.0em] md:text-[1.1em] mb-[40px]  text-center md:text-left">
              AI that answers your leads before they ever get a quote from your competitor. 
              Turns your offers, prices and policies into a co-pilot that handles client questions, qualifies enquiries and drafts quotes in seconds.
              We’re opening a small group of founding partners who will get hands-on support and free lifetime access.
            </p>
            <p className="text-[#ffffff75] text-[1.0em] md:text-[1.1em] mb-[40px]  text-center md:text-left">
              Book a 15-minute call to secure your spot!
            </p>

          </div>
          <Founder />
          <div data-aos="zoom-in" className="mb-[20px] !z-[0]">
            <CalInvite />
          </div>

          <div className="w-full max-w-[1330px] m-auto mb-[50px] px-[15px] !z-0">
            <div className="flex items-center flex-wrap md:flex-nowrap mb-[40px] mb-[50px] md:mb-[80px] lg:mb-[150px] flex-row-reverse">
              <div
                data-aos="zoom-in"
                className="max-w-[100%] md:max-w-[50%] mt-[10px]  md:mt-[0] p-[0] sm:p-[20px]"
              >
                <img src={business} alt="img" />
              </div>

              <div className="w-[100%] md:w-[50%] flex flex-col justify-center items-center p-[15px]">
                <div className="max-w-[100%] md:max-w-[420px] text-center md:text-left">
                  <div className="mb-[10px] text-center md:text-left">
                    <img
                      src={toggleicona}
                      alt="img"
                      className="m-auto md:m-0"
                    />
                  </div>
                  <h2 className="mb-[10px] text-[22px] md:text-[30px] font-[600] text-white text-center md:text-left">
                    Smarter quotes, less work.
                  </h2>
                  <p className="text-[#ffffff75] text-[1.1em] leading-[1.1em] md:text-[1.4em] md:leading-[1.2em] mb-[40px]  text-center md:text-left">
                    Invite AI helps you move from manual quoting to an AI-assisted flow. 
                    Using your own offers and pricing, it supports you in replying faster, 
                    staying consistent, and turning more enquiries into confirmed bookings—with far less effort from your team.
                  </p>
                  <div className="flex flex-wrap items-start justify-center md:justify-start gap-[5px]">
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Instant client answers
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Smart lead qualification
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Quote in seconds
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Centralised conversation history
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full flex items-center flex-wrap md:flex-nowrap mb-[40px] mb-[50px] md:mb-[80px] lg:mb-[150px]   ">
              <div className="w-[100%] md:w-[50%]  p-[0] sm:p-[20px]">
                <div data-aos="zoom-in" className="max-w-[400px] m-auto">
                  <img src={facilityimg} alt="img" />
                </div>
              </div>

              <div className="w-[100%] md:w-[50%] flex flex-col justify-center items-center p-[15px]">
                <div className="w-[100%] max-w-[100%] md:max-w-[480px]">
                  <h2 className="mb-[10px] text-[22px] md:text-[30px] font-[600] text-white text-center md:text-left">
                    AI that keeps your team in the loop
                  </h2>
                  <p className="text-[#ffffff75] text-[1.1em] leading-[1.1em] md:text-[1.4em] md:leading-[1.2em] mb-[40px]  text-center md:text-left">
                     Before and after an event, messages fly across WhatsApp, email and socials.
                     Invite AI adds a smart layer on top of your communication, 
                     helping you stay responsive, keep everything organised.
                  </p>
                  <div className="flex flex-wrap items-start justify-center md:justify-start gap-[5px]">
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Centralised client communication
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      AI-assisted responses
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Timely follow-ups
                    </div>
                    <div className="bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500] text-center">
                      Stronger client experience
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className=" flex items-center flex-wrap md:flex-nowrap flex-row-reverse mb-[40px] mb-[50px] md:mb-[80px] lg:mb-[150px]">
              <div
                data-aos="zoom-in"
                className="max-w-[100%] md:max-w-[50%] p-[20px]"
              >
                <img src={servicebanner} alt="img" />
              </div>

              <div className="w-[100%] md:w-[50%] flex flex-col justify-center items-center  p-[15px]">
                <div className="max-w-[100%] md:max-w-[420px]">
                  <h2 className="mb-[10px] text-[22px] md:text-[30px] font-[600] text-white text-center md:text-left">
                    Keep every event on track and clients expectations aligned
                  </h2>
                  <p className="text-[#ffffff75] text-[1.1em] leading-[1.1em] md:text-[1.4em] md:leading-[1.2em]   text-center md:text-left">
                    Invite AI learns your event terms, policies and timelines, 
                    then acts as a living reference across the whole project—so clients know exactly 
                    what to expect and you avoid last-minute misunderstandings.
                  </p>
                </div>
              </div>
            </div>

            <div
              data-aos="zoom-in"
              className="flex flex-wrap items-start gap-[20px] md:gap-[40px]"
            >
              <div className="w-full mb-[20px] md:mb-[40px] lg:mb-[80px]">
                <h2 className=" mb-[15px] text-white text-[1.6em] leading-[1.2em] md:text-[2em] md:leading-[1.2em] text-center font-[600]">
                  Focus on what you do best—delivering unforgettable
                  experiences.
                </h2>
                <p className="text-[#ffffff80] text-[1.1em] md:text-[1.4em] text-center font-[600]">
                  We build an AI co-pilot around your services, prices and policies—so quotes, 
                  client communication and expectations stay under control, 
                  while you and your team focus on the actual event.
                </p>
              </div>
              <div>
                <ServiceTabs />
              </div>
            </div>
          </div>

          <div className="max-w-[1400px] m-auto mt-[30px] md:mt-[80px]">
            <div data-aos="zoom-in" className="mb-[60px]">
              <img src={blastcaterignbanner} alt="img" className=" px-2" />
            </div>

            <div
              data-aos="zoom-in"
              className="flex flex-col items-center justify-center w-full max-w-[800px] m-auto"
            >
              <h2 className="mb-[15px] text-white text-[1.3em] md:text-[1.8em] font-[700] text-center ">
                Become a Founding Partner of Invite AI
              </h2>
              <p class="mb-[40px] text-[#ffffff80] text-[1.1em] md:text-[1.4em] font-[400] text-center ">
                We’re opening Invite AI to a small group of event service providers who want to shape 
                how AI runs their operations. You share feedback with us in short calls, we build around your 
                real workflow — and you keep full access to the product free for life.
              </p>

              <div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </div>
  );
}
