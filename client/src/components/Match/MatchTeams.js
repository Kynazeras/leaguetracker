import React from 'react';
// Components
import TeamList from './TeamList';

export default function MatchTeams({ teams, currentPatch }) {
  return (
    <div className='Match-teams'>
      <TeamList side={teams.blueSide} currentPatch={currentPatch} />
      <TeamList side={teams.redSide} currentPatch={currentPatch} />
    </div>
  );
}
