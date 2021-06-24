import React, { Component } from 'react';
// Components
import MatchExpandTeam from './MatchExpandTeam';
// import MatchExpandSummoner from "./MatchExpandSummoner";

export default class MatchExpand extends Component {
  render() {
    const { win, teams, currentPatch } = this.props;
    return (
      <div className={`Match-expand ${win ? 'Match-win' : 'Match-lose'}`}>
        <div className='details'>
          <MatchExpandTeam
            team={teams.blueSide}
            color='Blue'
            currentPatch={currentPatch}
          />
          <MatchExpandTeam
            team={teams.redSide}
            color='Red'
            currentPatch={currentPatch}
          />
        </div>
      </div>
    );
  }
}
