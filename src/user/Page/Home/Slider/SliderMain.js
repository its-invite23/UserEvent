import React from 'react'
import SliderMain1 from './SliderMain1'
import SliderMain2 from './SliderMain2'
import SliderMobile from "../../../../assets/SliderMobile.png";


export default function SliderMain() {
  return (
    <div>
        <div className='relative mt-[80px] sm:mt-[100px] md:mt-[150px] lg:mt-[200px] xl:mt-[340px] mb-[10px] sm:mb-[50px] md:mb-[150px] lg:mb-[100px] xl:mb-[260px]'>
            <div className='absolute left-[0] right-[0] top-[25px] sm:top-[-35px] md:top-[-100px] lg:top-[-100px] xl:top-[-200px] z-[10] m-auto max-w-[200px] sm:max-w-[260px] md:max-w-[450px] lg:max-w-[450px] xl:max-w-[590px]'>
                <img src={SliderMobile} alt='img' className='w-full max-w-full' />
            </div>
            <div className='homeSliderAnim'>
              <SliderMain1/>
              <SliderMain2/>
            </div>
        </div>
    </div>
  )
}
