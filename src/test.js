import React, { useEffect, useState } from 'react';
import data from "../src/JSon/Player.json"

const PlayerFAQ = () => {
    console.log("data?.data",data)
  const [players, setPlayers] = useState();

  // Fetch player.json data
  

  return (
    <div className="faq-section">
      <h2 className="text-2xl font-bold mb-4">Player FAQs</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index} className="mb-3">
            <h3 className="text-xl font-semibold">{player.question}</h3>
            <p className="text-gray-700">{player.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerFAQ;
