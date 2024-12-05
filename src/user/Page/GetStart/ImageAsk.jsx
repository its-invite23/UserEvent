import React from 'react'

export default function ImageAsk({ step }) {
  return (
    <div className="min-w-[280px] sm:min-w-[300px] md:min-w-[440px] pt-[10px] mt-[15px] lg:mt-[0]">
      <img
        src={step}
        alt="banner"
        className="rounded-[20px] w-full max-w-full"
      />
    </div>
  )
}
