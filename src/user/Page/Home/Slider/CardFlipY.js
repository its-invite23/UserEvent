import React, { useEffect, useState } from "react";
import "./CardFlipY.css";

export default function CardFlipY({imgsrc}) {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
          setIsFlipped((prevState) => !prevState);
        }, 8000);
    
        return () => clearInterval(interval); 
      }, []);
  
    return (
        <div className="scene-y scene--card-y">
        <div className={`card ${isFlipped ? "is-flipped-y" : ""}`}>
          <div className="card__face-y card__face--front-y">
            {/* Front */}
            <img src={imgsrc} className="object-cover w-full h-full"/>
          </div>
          <div className="card__face-y card__face--back-y">
            {/* Back */}
          <img src={imgsrc} className="object-cover w-full h-full scale-y-[-1]"/>
          </div>
        </div>
      </div>
    );
}
