import React, { Component } from "react";
// Components
import MatchExpandSummoner from "./MatchExpandSummoner";

export default class MatchExpand extends Component {
  render() {
    const { win, teams } = this.props;
    return (
      <div className={`Match-expand ${win ? "Match-win" : "Match-lose"}`}>
        <div className="details">
          <MatchExpandSummoner summoner={teams.blueSide[0]} />
        </div>
      </div>
    );
  }
}
