import React from "react";
// Css
import "./MatchExpand.css";

export default function MatchExpandTeamHeader() {
  return (
    <div className="MatchExpandTeamHeader">
      <div className="victory-col">Victory</div>
      <div>KDA</div>
      <div>Damage</div>
      <div>Gold</div>
      <div>CS</div>
      <div>Wards</div>
      <div>Items</div>
    </div>
  );
}
