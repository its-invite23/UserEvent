import React from 'react'
import UserLayout from "../../Layout/UserLayout"
import GetStarted from './GetStarted'
import Slider from './Slider'
import Places from './Places'
import Visualize from './Visualize'
import Customers from './Customers'
import Planning from './Planning'
import Contact from './Contact'

export default function Index() {
  return (
    <UserLayout>
      <GetStarted />
      <Slider />
      <Places />
      <Visualize />
      <Customers />
      <Planning />
      <Contact />
    </UserLayout>
  )
}
