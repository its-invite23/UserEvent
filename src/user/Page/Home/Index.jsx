import React from 'react'
import GetStarted from './GetStarted'
import Slider from './Slider'
import Places from './Places'
import Visualize from './Visualize'
import Customers from './Customers'
import Planning from './Planning'
import Contact from './Contact'
import Experince from './Experince'
import SliderMain from './Slider/SliderMain'
import UserLayout from '../../Layout/UserLayout'
import CalInvite from '../../compontents/CalInvite'

export default function Index() {
  return (
    <div className='bg-[#000] '>
      <UserLayout>
        <GetStarted />
        <SliderMain />
        <Slider />
        <Places />
        <Visualize />
        <Customers />
        <Experince />
        <Planning />
        <Contact />
        <CalInvite />

      </UserLayout>
    </div>
  )
}
