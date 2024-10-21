import React from 'react'
import UserLayout from "../../Layout/UserLayout"
import GetStarted from './GetStarted'
import Slider from './Slider'
import Places from './Places'
import Visualize from './Visualize'
import Customers from './Customers'
import Planning from './Planning'
import Contact from './Contact'
import Experince from './Experince'


export default function Index() {
  return (
    <div className='bg-[#000] '>
      <UserLayout>
        <GetStarted />
        <Slider />
        <Places />
        <Visualize />
        <Customers />
        <Experince/>
        <Planning />
        <Contact />
      </UserLayout>
    </div>
  )
}
