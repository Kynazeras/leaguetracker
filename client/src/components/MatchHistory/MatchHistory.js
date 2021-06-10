import React, { Component } from "react";
// Components
import Match from "../Match/Match";
// Css
import "./MatchHistory.css";

const getSummonerObj = (participants, puuid) => {
  return participants.find((summoner) => summoner.puuid === puuid);
};

export default class MatchHistory extends Component {
  render() {
    const { matches, puuid } = this.props;
    return (
      <div className="MatchHistory">
        {Array.isArray(matches) ? (
          <React.Fragment>
            {matches.map((match) => (
              <Match
                key={match.gameId}
                summonerObj={getSummonerObj(match.participants, puuid)}
                {...match}
              />
            ))}
          </React.Fragment>
        ) : (
          <h1>Match History not found</h1>
        )}
      </div>
    );
  }
}
