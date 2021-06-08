import React, { Component } from "react";

export default class MatchExpand extends Component {
  render() {
    const { win } = this.props;
    return (
      <div className={`Match-expand ${win ? "Match-win" : "Match-lose"}`}>
        <div className="details">
          <hr />
          <p>THIS IS A TEST</p>
        </div>
      </div>
    );
  }
}
