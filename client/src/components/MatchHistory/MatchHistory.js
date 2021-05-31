import React, { Component } from "react";
// Components
import Match from "../Match/Match";
// Css
import "./MatchHistory.css";

export default class MatchHistory extends Component {
  render() {
    const { matches } = this.props;
    return (
      <div className="MatchHistory">
        {matches.map((match) => (
          <Match {...match} />
        ))}
      </div>
    );
  }
}
