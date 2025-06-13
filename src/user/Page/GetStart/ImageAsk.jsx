import React from 'react'

export default function ImageAsk({ step }) {
  return (
    <div className="min-w-[180px] sm:min-w-[200px] md:min-w-[220px] lg:min-w-[280px] pt-[10px] mt-[15px] lg:mt-[0]">
      <img
        src={step}
        alt="banner"
        className="rounded-[12px] w-full max-w-full h-[150px] md:h-[180px] lg:h-[220px] object-cover"
      />
    </div>
  )
}