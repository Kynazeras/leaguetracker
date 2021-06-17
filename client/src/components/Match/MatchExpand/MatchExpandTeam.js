import React from 'react';
// Components
import MatchExpandTeamHeader from './MatchExpandTeamHeader';
import MatchExpandSummoner from './MatchExpandSummoner';

export default function MatchExpandTeam({ color, team }) {
  console.log(team);
  const win = team[0].win;
  return (
    <div className={`MatchExpandTeam ${win ? 'win' : 'lose'}`}>
      <MatchExpandTeamHeader win={win} color={color} />
      {team.map((summoner) => (
        <MatchExpandSummoner summoner={summoner} key={summoner.puuid} />
      ))}
    </div>
  );
}
