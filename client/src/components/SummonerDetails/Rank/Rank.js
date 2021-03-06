import React from "react";
// Css
import "./Rank.css";
// constants
import {
  getRankedImg,
  numberWithCommas,
} from "../../../constants/util-functions";

const getWinRate = (wins, losses) => {
  const totalGames = wins + losses;
  const fraction = wins / totalGames;
  const wr = fraction * 100;
  return `${wr.toFixed(1)}%`;
};

export default function Rank({ tier, rank, leaguePoints, wins, losses }) {
  return (
    <React.Fragment>
      <h2>Rank</h2>
      <hr />
      {tier ? (
        <div className="info">
          <img
            className="rank-img"
            src={getRankedImg(tier)}
            alt="ranked emblem"
          />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span>Ranked Solo</span>
            <span>
              {tier} - {rank} / {numberWithCommas(leaguePoints)} LP
            </span>
            <span className="win-rate">WR: {getWinRate(wins, losses)}</span>
          </div>
        </div>
      ) : (
        <div>
          <h2>No Ranked data</h2>
        </div>
      )}
    </React.Fragment>
  );
}
