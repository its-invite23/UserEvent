import React, { useEffect, useState } from "react";
import UserLayout from "../../Layout/AuthLayout";
import NextPreBtn from "../GetStart/NextPreBtn";

import { FaArrowRight } from "react-icons/fa6";
import step1banner from "../../../assets/step1banner.jpg";
import step2banner from "../../../assets/step2banner.jpg";
import step3banner from "../../../assets/step3banner.jpg";
import step4banner from "../../../assets/step4banner.jpg";
import step5banner from "../../../assets/step5banner.jpg";
import step6banner from "../../../assets/step6banner.jpg";

function AskQuestion() {
    const [currentStep, setCurrentStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleOptionSelect = (nextStep) => {
        if (nextStep >= 1 && nextStep <= 5) {
            setCurrentStep(nextStep);
            if (nextStep === 5) {
                setShowSuccess(true);
            } else {
                setShowSuccess(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <>

            {/* Please enter your contact details */}
            <div className="relative bg-[#000000]">
                <UserLayout>
                    {/* Background */}
                    <div className="absolute top-[0] left-[0] right-[0] top-[-230px] sm:top-[-200px] md:top-[-150px] lg:top-[0px] z-[0] m-auto flex items-center justify-center">
                        <svg width="1440" height="840" viewBox="0 0 1440 840" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_f_34_53)">
                                <ellipse cx="678.515" cy="487.095" rx="253.309" ry="485.239" transform="rotate(-73.8676 678.515 487.095)" fill="#EB3465" />
                            </g>
                            <g filter="url(#filter1_f_34_53)">
                                <ellipse cx="925.069" cy="400.495" rx="215.705" ry="312.45" transform="rotate(65.6053 925.069 400.495)" fill="#731BCD" />
                            </g>
                            <defs>
                                <filter id="filter0_f_34_53" x="-26.965" y="-25.146" width="1410.96" height="1024.48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="117" result="effect1_foregroundBlur_34_53" />
                                </filter>
                                <filter id="filter1_f_34_53" x="392.813" y="-68.5735" width="1064.51" height="938.138" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                    <feGaussianBlur stdDeviation="117" result="effect1_foregroundBlur_34_53" />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                    {/* Main Div */}
                    <div className="relative w-[96%] max-w-[1170px] h-[100%] lg:h-[640px] m-auto mt-[30px] md:mt-[50px] lg:mt-[105px] bg-[#141414]">
                        {/* Progress Bar */}
                        <div className="relative w-full h-[10px] rounded-[30px]">
                            <div className="absolute top-[0] left-[0] w-[30%] h-[10px] bg-[#EB3465] rounded-[30px]"></div>
                        </div>

                        {/* Start */}
                        <div className="h-full pb-[20px] pl-[15px] lg:pl-[50px] pr-[15px] ">
                            {/* Step-1 */}
                            <div className="hidden flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">Please enter your <br /> contact details</h2>
                                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                                        <input type="email" placeholder="name@example.com" className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] focus:outline" />
                                    </div>
                                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                                        <input type="number" placeholder="+1 - 456 654 XXXX" className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] focus:outline" />
                                    </div>

                                    <div className="mt-[30px]">
                                        <button className="flex items-center justify-center gap-[8px] w-[100%] min-w-[195px] px-[10px] py-[14px] rounded-[60px] bg-[#EB3465] hover:bg-[#fb3a6e] font-[manrope] font-[600] text-[16px] text-white text-center">Get Started <FaArrowRight /></button>
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step1banner} alt="banner" className="rounded-[20px]" />
                                </div>
                            </div>

                            {/* Step-2 */}
                            <div className="hidden flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">What event do you <br /> want to celebrate?</h2>


                                    <div className="mt-[30px]">
                                        <NextPreBtn />
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step2banner} alt="banner" className="rounded-[20px]" />
                                </div>
                            </div>

                            {/* Step-3 */}
                            <div className="hidden flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">How many people do <br /> you want to invite?</h2>
                                    <div className="mb-[5px] w-full max-w-[390px] mb-[15px]">
                                        <input type="text" placeholder="Type your answer..." className="w-full border-b border-b-[#222] bg-transparent px-[0] py-[10px] text-white focus:border-b focus:border-b-[#222] focus:outline" />
                                    </div>
                                    <div className="mt-[30px]">
                                        <NextPreBtn />
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step3banner} alt="banner" className="rounded-[20px]" />
                                </div>
                            </div>

                            {/* Step-4 */}
                            <div className="hidden flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">When will it take <br /> place?</h2>

                                    <div className="mt-[30px]">
                                        <NextPreBtn />
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step4banner} alt="banner" className="rounded-[20px]" />
                                </div>
                            </div>

                            {/* Step-5 */}
                            <div className="hidden h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">In which area will it <br /> take place?</h2>

                                    <div className="w-full flex flex-wrap items-center gap-[15px] mb-[20px]">
                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Paris- 75</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Hauts de Seine - 92</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Seine saint Denis</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Val de Marne- 95</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Other</button>
                                    </div>

                                    <div className="mt-[30px]">
                                        <NextPreBtn />
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step5banner} alt="banner" className="h-auto rounded-[20px]" />
                                </div>
                            </div>

                            {/* Step-6 */}
                            <div className="h-full flex items-center lg:items-start justify-center lg:justify-between flex-col lg:flex-row">
                                <div className="flex flex-col items-center lg:items-start pt-[30px] lg:pt-[40px] lg:pr-[15px] w-full lg:w-auto">
                                    <h2 className="font-[manrope] font-[700] text-[30px] md:text-[38px] lg:text-[48px] mb-[30px] text-white leading-[40px] md:leading-[42px] lg:leading-[52px] text-center lg:text-left">What type of food <br/> will you eat?</h2>

                                    <div className="w-full flex flex-wrap items-center gap-[15px] mb-[20px]">
                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🌮 Mexican</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] "> 🍔 Burgers</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🥩 Steakhouse</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🍚 Brunch</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🫛 Healthy / Vegan / Gluten Free</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🍛 Asian</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🍕 Italian</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🥐 French / Bistrot</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">🎂 A cake for the celebration</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Nothing we just want drinks and tapas!</button>

                                        <button className="px-[30px] py-[8px] border border-[#fff] rounded-[60px] font-[manrope] font-[600] text-[16px] text-white hover:text-[#141414] bg-[#141414] hover:bg-[#ffffff] ">Other</button>

                                        
                                    </div>

                                    <div className="mt-[30px]">
                                        <NextPreBtn />
                                    </div>
                                </div>
                                <div className="min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
                                    <img src={step6banner} alt="banner" className="h-auto rounded-[20px]" />
                                </div>
                            </div>
                        </div>

                    </div>
                </UserLayout>
            </div>


        </>
    );
}

export default AskQuestion;
