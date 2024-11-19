import React from 'react'
import UserLayout from '../../Layout/UserLayout'
import empower from '../../../assets/service/empower.png'
import arrowwh from '../../../assets/service/arrowwh.svg'
import iconplay from '../../../assets/service/icon-play.svg'
import toggleicona from '../../../assets/service/toggleicona.svg'
import business from '../../../assets/service/business.jpg'
import facilityimg from '../../../assets/service/facilityimg.png'
import servicebanner from '../../../assets/service/servicebanner.png'
import blastcaterignbanner from '../../../assets/service/blastcaterignbanner.png'
import ContactForm from './ConntactForm'
import ServiceTabs from './ServiceTabbing'

export default function ServicesProviderHome() {
  return (
    <div className="bg-[#000] p-[10px] h-full min-h-full">
      <UserLayout>
        <div className='relative mt-[30px] md:mt-[40px] lg:mt-[60px] xl:mt-[100px]'>
          <div className='flex flex-wrap xl:flex-nowrap xl:block'>
            <div className='flex flex-wrap md:flex-nowrap max-w-[1430px] px-[15px] m-auto'>
              <div className='max-w-[600px] lg:max-w-[500px] xl:max-w-[600px] pt-[10px] md:pt-[5px] lg:pt-[50px] xl:pt-[100px] '>
                <h2 className='mb-[30px] text-[2em] leading-[1.2em] md:text-[2.5em] md:leading-[1.1em] lg:text-[4em] lg:leading-[1.0em]  xl:text-[6em] xl:leading-[1.1em] text-white  font-[700]'>We empower your business</h2>
                <p className='max-w-[100%] lg:max-w-[450px] text-[17px] sm:text-[18px] md:text-[20px] text-[#ffffff80]  text-left lg:text-left font-[600]'>INVITE connects you with new customers and simplifies your operations—so you can focus on delivering great service, with no fees or hassles.</p>
                <div className='flex flex-wrap md:flex-nowrap items-center justify-center md:justify-start gap-[15px] mt-[20px] md:mt-[60px]'>
                  <button className='flex items-center gap-[5px] hover:gap-[15px] transition-all text-[18px] font-[600] text-white text-center bg-[#eb3465] hover:bg-[#4400c3] px-[15px] py-[10px] md:px-[30px] md:py-[15px] rounded-[5px]'>Get Started 
                    <img src={arrowwh} alt="" className='max-w-[18px]' /></button>

                    <button className='flex items-center gap-[10px] hover:gap-[15px] transition-all text-[18px] font-[600] text-white text-center bg-[#80808033] hover:bg-[#80808059] px-[15px] py-[10px] md:px-[30px] md:py-[15px] rounded-[5px]'>View Demo 
                    <img src={iconplay} alt="" className='max-w-[18px]' /></button>
                </div>
              </div>
            </div>
            <div className=' xl:absolute right-[0] top-[0] w-[100%] max-w-[100%] xl:max-w-[50%] mt-[50px] xl:mt-[0]'>
              <img src={empower} alt="img" className='max-w-[100%] sm:max-w-[400px] md:max-w-[80%]  lg:max-w-[80%] xl:max-w-[100%] m-auto' />
            </div>
          </div>

          <div className='max-w-[550px] m-auto mt-[20px] md:mt-[100px]'>
            <h2 className='mb-[10px] md:mb-[20px] text-[25px] md:text-[30px] font-[600] text-white text-center'>Secure your spot with us</h2>
            <p className='text-[#ffffff75] text-[1.0em] md:text-[1.1em] mb-[40px]'>Be among the first service providers to connect with new customers and streamline your business on INVITE. Sign up for our waitlist and get early access to powerful tools designed to grow your business effortlessly. Don’t miss your chance—secure your spot today!</p>
          </div>

          <ContactForm/>


          <div className='max-w-[1400px] m-auto mt-[50px] md:mt-[150px]'>
            <div className=' flex items-center flex-wrap md:flex-nowrap mb-[150px]'>
              <div className='w-[100%] md:w-[50%] flex flex-col justify-center items-center'>
                <div className='max-w-[420px]'>
                  <div className='mb-[10px]'>
                    <img src={toggleicona} alt="img" />
                  </div>
                  <h2 className='mb-[10px] text-[22px] md:text-[30px] font-[600] text-white text-left'>More Events, More Business.</h2>
                  <p className='text-[#ffffff75] text-[1.1em] leading-[1.1em] md:text-[1.4em] md:leading-[1.2em] mb-[40px]'>Instantly connect with a wide audience of event planners ready to book your services—your next customer is just a click away.</p>
                  <div className='flex flex-wrap items-start gap-[5px]'>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Boost Visibility</div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Customizable Service Offerings</div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Performance Tracking</div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Collaborative Workspace</div>
                  </div>
                </div>
              </div>

              <div className='max-w-[100%] md:max-w-[50%] mt-[40px] md:mt-[0]'>
                <img src={business} alt="img" />
              </div>
            </div>

            <div className=' flex flex-row-reverse items-center flex-wrap md:flex-nowrap mb-[150px]'>
              <div className='w-[50%] flex flex-col justify-center items-center'>
                <div className='max-w-[420px]'>
                 
                  <h2 className='mb-[10px] text-[30px] font-[600] text-white text-left'>We facilitate bookings management</h2>
                  <p className='text-[#ffffff75] text-[1.4em] leading-[1.2em] mb-[40px]'>Seamlessly track and manage all your bookings in one place—no more missed details or last-minute scrambles.</p>
                  <div className='flex flex-wrap items-start gap-[5px]'>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Automated Booking Management</div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Instant Invoicing</div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Business Analytics
                    </div>
                    <div className='bg-[#2e2e2eb3] px-[15px] py-[10px] rounded-[6px] text-[#ffffff8f] fount-[500]'>Real-Time Payment Tracking</div>
                  </div>
                </div>
              </div>

              <div className='max-w-[50%]'>
                <div className='max-w-[400px]'>
                  <img src={facilityimg} alt="img" />
                </div>
              </div>
            </div>

            <div className=' flex items-center flex-wrap md:flex-nowrap mb-[150px]'>
              <div className='w-[50%] flex flex-col justify-center items-center'>
                <div className='max-w-[420px]'>
                  
                  <h2 className='mb-[10px] text-[30px] font-[600] text-white text-left'>List your services for FREE</h2>
                  <p className='text-[#ffffff75] text-[1.4em] leading-[1.2em] mb-[40px]'>List your services and gain new customers without worrying about hidden costs—your profits are yours to keep.</p>
                 
                </div>
              </div>

              <div className='max-w-[50%]'>
                <img src={servicebanner} alt="img" />
              </div>
            </div>

            <div className='flex items-start gap-[40px]'>
              <ServiceTabs />
            </div>
          </div>

          <div className='max-w-[1400px] m-auto mt-[150px]'>
            <div className='mb-[60px]'>
              <img src={blastcaterignbanner} alt="img" />
            </div>

            <div className='w-full max-w-[800px] m-auto'>
              <h2 className='mb-[15px] text-white text-[1.8em] font-[700] text-center'>Secure your spot with us</h2>
              <p class="mb-[40px] text-[#ffffff80] text-[1.4em] font-[400]">Be among the first service providers to connect with new customers and streamline your business on INVITE. Sign up for our waitlist and get early access to powerful tools designed to grow your business effortlessly. Don’t miss your chance—secure your spot today!</p>

              <div>
              <ContactForm/>
              </div>
            </div>

          </div>
          
        </div>
      </UserLayout>
    </div>
  )
}
