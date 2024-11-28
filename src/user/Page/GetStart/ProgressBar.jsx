import React from 'react'

export default function ProgressBar({progressWidth}) {
    console.log(progressWidth)
  return (
    <div className="relative w-full h-[10px] rounded-[30px] bg-[#222]">
    <div
      className="absolute top-[0] left-[0] h-[10px] bg-[#ff0062] rounded-[30px]"
      style={{ width: `${progressWidth}%` }}
    ></div>
  </div>
  )
}
