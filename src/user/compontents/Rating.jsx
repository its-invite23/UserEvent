import React from 'react'
import { IoStar } from "react-icons/io5";


export default function Rating({ value, size, color }) {
    const rating = ["1", "2", "3", "4", "5"];
    const starColor = color || "#FCD53F"; // Default color is green
    return (
        <>
            <div className='flex gap-0.5'>
                {rating && rating.map((r, i) => {
                    return (
                        <IoStar
                            key={i}
                            size={size || '32'}
                            color={value > i ? starColor : "#ccc"}
                            variant="Bold"
                        />
                    );
                })}
            </div>
        </>
    );
}
