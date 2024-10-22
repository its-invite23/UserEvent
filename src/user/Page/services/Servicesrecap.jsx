import React from 'react'
import UserLayout from '../../Layout/UserLayout'
import ServicesProvider from './ServicesProvider'

export default function Servicesrecap() {
  return (
    <div className='bg-[#000] p-[10px] h-full min-h-full'>
      <UserLayout>

<ServicesProvider/>
      </UserLayout>
    </div>
  )
}
