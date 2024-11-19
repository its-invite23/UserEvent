import React from 'react'
import GetStarted from './GetStarted'
import Slider from './Slider'
import Places from './Places'
import Visualize from './Visualize'
import Customers from './Customers'
import Planning from './Planning'
import Contact from './Contact'
import Experince from './Experince'
import HomeFooter from "./HomeFooter"
import Header from '../../compontents/Header'
import GallerySlider from './FlipEffectSwiper'
import SliderMain from './Slider/SliderMain'


export default function Index() {
  return (
    <div className='bg-[#000] '>
      <Header />
      <GetStarted />
      <SliderMain/>
      <Slider />
      <Places />
      <Visualize />
      <Customers />
      <Experince />
      <Planning />
      <Contact />
      {/* <GallerySlider /> */}
      <HomeFooter />
    </div>
  )
}
