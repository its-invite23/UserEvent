import React from 'react'
import SliderMain1 from './SliderMain1'
import SliderMain2 from './SliderMain2'
import SliderMobile from "../../../../assets/SliderMobile.png";


export default function SliderMain() {
  return (
    <div>
        <div className='relative mt-[100px] md:mt-6 mb-[10px] sm:mb-[50px] md:mb-[150px] lg:mb-[100px] xl:mb-[260px]'>
            <div className='absolute left-[0] right-[0] top-[25px] sm:top-[-50px] md:top-[100px] lg:top-[107px] z-[10] mx-auto max-w-[168px] sm:max-w-[280px] md:max-w-[382px]'>
                <img src={SliderMobile} alt='img' className='w-[168px] sm:w-[280px] md:w-[382px] max-w-full' />
            </div>
            <div className='homeSliderAnim'>
              <SliderMain1/>
              <SliderMain2/>
            </div>
        </div>
    </div>
  )
}
