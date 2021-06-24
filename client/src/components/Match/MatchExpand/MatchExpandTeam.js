import React from 'react';
// Components
import MatchExpandTeamHeader from './MatchExpandTeamHeader';
import MatchExpandSummoner from './MatchExpandSummoner';

export default function MatchExpandTeam({ color, team, currentPatch }) {
  const win = team[0].win;
  return (
    <div className={`MatchExpandTeam ${win ? 'win' : 'lose'}`}>
      <MatchExpandTeamHeader win={win} color={color} />
      {team.map((summoner) => (
        <MatchExpandSummoner
          summoner={summoner}
          key={summoner.puuid}
          currentPatch={currentPatch}
        />
      ))}
    </div>
  );
}
