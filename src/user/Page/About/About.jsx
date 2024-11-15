import React from "react";
import UserLayout from "../../Layout/UserLayout";
import orgimg01 from '../../../assets/about/orgimg01.jpg'
import orgimg02 from '../../../assets/about/orgimg02.jpg'
import orgimg03 from '../../../assets/about/orgimg03.jpg'
import orgimg04 from '../../../assets/about/orgimg04.jpg'
import abtsignupimg from '../../../assets/about/abt-signup-img.png'

export default function About() {
  return (
    <div className="relative bg-[#000000]">
      <UserLayout>
        <div>
            <div className="">
              <div className="w-layout-grid hero-grid">

                <div className="w-full aboutHeroData">
                  <div className="max-w-[1200px] mx-auto">
                    <div className="pt-[300px]">
                      <h2 className="mb-[50px] text-[50px] font-bold text-white leading-[55px]">You can <br /> organize <br /> everything</h2>
                      <p className="max-w-[400px] text-[20px] text-white text-[#777] font-[600]">Craft unforgettable moments with ease and precision using our all-in-one event planning app.</p>
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

            <div className="max-w-[1300px] mx-auto px-[20px]">
              <div className="flex flex-wrap lg:flex-nowrap gap-[10px] sm:gap-[30px] md:gap-[50px] lg:gap-[100px] mt-[150px]">
                <div className="w-[100%] lg:w-[55%]">
                  <img src={abtsignupimg} alt="img" className="rounded-[10px]" />
                </div>
                <div className="w-[100%] lg:w-[45%] flex flex-col gap-[25px]">
                  <div className="w-full flex  items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">+∞</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Hours saved</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Save countless hours on event planning with INVITE—your time, your moments, perfectly organized.</p>
                    </div>
                  </div>

                  <div className="w-full flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">0</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Fees</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">No costs for service providers to join, and no charges for customers planning their events.</p>
                    </div>
                  </div>


                  <div className="flex    items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">94%</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Satisfaction rate</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Our app is trusted by event planners and providers alike.</p>
                    </div>
                  </div>


                  <div className="flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
                    <div className="w-[160px] text-center">
                      <h2 className="text-[2.5rem] md:text-[3.5rem]  lg:text-[4.5rem]  font-[500] text-white">1</h2>
                    </div>
                    <div className="w-[290px]">
                      <h2 className="text-[18px] font-[600] text-white">Seamless experience, everytime</h2>
                      <p className="text-[16px] leading-[1.6] font-[400] text-[#ffffff8a]">Enjoy a flawless event planning process from start to finish.</p>
                    </div>
                  </div>

                  <div className="flex   items-center gap-[10px] sm:gap-[20px] md:gap-[50px] lg:gap-[100px] ">
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
                <div className="w-[62%]">
                  <h2 className="text-[13px] text-[#fff9] uppercase">POWERED BY AI</h2>
                  <h3 className="font-[600] text-[4em] text-[#fff] leading-[1.1] ">Trusted by over an infinity of  service providers around the world</h3>
                </div>
                <div className="w-[38%]">
                  <p className="text-[1.4em] text-[#ffffff75] leading-[1.5]">Our advanced Generative AI scours global databases, integrating service providers from every corner of the world, allowing you to seamlessly book the best options, wherever you are, whenever you need.</p>
                </div>
              </div>
            </div>
        </div>

      </UserLayout>
    </div>
  );
}
