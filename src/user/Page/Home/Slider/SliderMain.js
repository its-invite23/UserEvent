import React from 'react'
import SliderMain1 from './SliderMain1'
import SliderMain2 from './SliderMain2'
import SliderMobile from "../../../../assets/SliderMobile.png";


export default function SliderMain() {
  return (
    <div>
        <div className='relative'>
            <div className='absolute left-[0] right-[0] top-[150px] z-[10] m-auto max-w-[400px]'>
                <img src={SliderMobile} alt='img' />
            </div>
            <SliderMain1/>
            <SliderMain2/>
        </div>
    </div>
  )
}
