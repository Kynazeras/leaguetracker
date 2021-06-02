import React from "react";
// Css
import "./Rank.css";

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
        <React.Fragment>
          <p>
            {tier} - {rank}
          </p>
          <p>{leaguePoints} LP</p>
          <p>WR: {getWinRate(wins, losses)}</p>
        </React.Fragment>
      ) : (
        <div>
          <h2>No Ranked data</h2>
        </div>
      )}
    </React.Fragment>
  );
}
