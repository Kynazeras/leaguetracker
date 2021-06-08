import React from "react";

export default function MatchChamp({ imgSrc, championName }) {
  return (
    <div className="Champ">
      <img src={imgSrc} alt={championName} />
      <h2>{championName}</h2>
    </div>
  );
}
