import React from "react";
// Css
import "./MatchExpand.css";
// Constants
import { champImg } from "../../../constants/util-functions";

export default function MatchExpandSummoner({ summoner }) {
  console.log(summoner);
  return (
    <div className="MatchExpandSummoner">
      <div className="champ">
        <img src={champImg(summoner.championName)} />
        <span>{summoner.summonerName}</span>
      </div>
    </div>
  );
}
