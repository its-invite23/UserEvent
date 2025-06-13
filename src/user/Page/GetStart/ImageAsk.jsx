import React from 'react'

export default function ImageAsk({ step }) {
  return (
    <div className="min-w-[200px] sm:min-w-[250px] md:min-w-[300px] lg:min-w-[350px] pt-[10px] mt-[15px] lg:mt-[0]">
      <img
        src={step}
        alt="banner"
        className="rounded-[15px] w-full max-w-full h-[200px] md:h-[250px] lg:h-[300px] object-cover"
      />
    </div>
  )
}