import React, { Component } from 'react';
// Components
import MatchExpandTeam from './MatchExpandTeam';
// import MatchExpandSummoner from "./MatchExpandSummoner";

export default class MatchExpand extends Component {
  render() {
    const { win, teams } = this.props;
    return (
      <div className={`Match-expand ${win ? 'Match-win' : 'Match-lose'}`}>
        <div className='details'>
          {/* <hr /> */}
          <MatchExpandTeam team={teams.blueSide} color='Blue' />
          {/* <hr /> */}
          <MatchExpandTeam team={teams.redSide} color='Red' />
        </div>
      </div>
    );
  }
}
