import React from 'react'
import redefinbanner from '../../../assets/home/redefinbanner.png'

export default function Experince() {
  return (
    <div className='w-full max-w-[1230px] m-auto px-[15px]'>
      <div className='w-full px-[15px] bg-[#D5D963] pt-[40px] lg:pt-[80px] rounded-[10px] lg:rounded-[20px] overflow-hidden'>

        <h2 className='mb-[10px] lg:mb-[20px] text-center font-morpen font-[700] text-[22px] md:text-[35px]  lg:text-[40px] leading-[30px] md:leading-[37px] lg:leading-[45px] text-[#171717] text-center'>Redefining Event Planning</h2>

        <p className='mb-[40px] font-manrope font-[600] text-[#0D0D0D] text-[16px] leading-[22px] text-center px-[0] md:px-[40px]  lg:px-[160px]'>Tired of losing time chasing down event service providers? Fed up with the headaches from all the hassle? We were too. That's why we decided to revolutionize the event planning process. Our mission? Turn complex planning into an effortless experience, making the magic of events accessible to all. Let's redefine event planning, together.</p>
        <div className='flex justify-center 11absolute 11bottom-[0] m-auto overflow-hidden'>
          <img src={redefinbanner} alt="img" className='max-w-[250px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[500px] xl:max-w-[550px] mb-[-10px]' />
        </div>
      </div>
    </div>
  )
}
