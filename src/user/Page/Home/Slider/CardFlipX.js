import React, { useEffect, useState } from "react";
import "./CardFlipX.css";

export default function CardFlipX({imgsrc}) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setIsFlipped((prevState) => !prevState);
        }, 8000);
    
        return () => clearInterval(interval); // Cleanup interval on component unmount
      }, []);
  
    return (
        <div className="scene scene--card">
        <div className={`card ${isFlipped ? "is-flipped" : ""}`}>
          <div className="card__face card__face--front">
            {/* Front */}
            <img src={imgsrc} className="object-cover w-full h-full"/>
          </div>
          <div className="card__face card__face--back">
            {/* Back */}
          <img src={imgsrc} className="object-cover w-full h-full scale-x-[-1]"/>
          </div>
        </div>
      </div>
    );
};
