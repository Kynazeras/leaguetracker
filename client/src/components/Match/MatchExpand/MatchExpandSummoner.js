import React from "react";
// Css
import "./MatchExpand.css";
// Constants
import { champImg, getKDA, itemImg } from "../../../constants/util-functions";

export default function MatchExpandSummoner({ summoner }) {
  console.log(summoner);
  const {
    championName,
    summonerName,
    kills,
    deaths,
    assists,
    totalDamageDealtToChampions,
    totalMinionsKilled,
    goldEarned,
    wardsPlaced,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
  } = summoner;
  const items = [item0, item1, item2, item3, item4, item5];
  return (
    <div className="MatchExpandSummoner">
      <div className="champ">
        <img src={champImg(championName)} alt={championName} />
        <span>{summonerName}</span>
      </div>
      <div className="MatchExpandSummoner-kda">
        {getKDA(kills, deaths, assists)}
      </div>
      <div>{totalDamageDealtToChampions}</div>
      <div>{goldEarned}</div>
      <div>{totalMinionsKilled}</div>
      <div>{wardsPlaced}</div>
      <div>
        {items.map((item) => (
          <img
            style={{ width: "1.5rem", height: "1.5rem" }}
            src={itemImg(item)}
          />
        ))}
      </div>
    </div>
  );
}
