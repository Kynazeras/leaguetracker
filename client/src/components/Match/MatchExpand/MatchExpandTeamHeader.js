import React from 'react';
// Css
import './MatchExpand.css';

export default function MatchExpandTeamHeader({ win, color }) {
  return (
    <div className='MatchExpandTeamHeader'>
      <div className='victory-col'>
        {win ? 'Victory' : 'Defeat'}({`${color} Team`})
      </div>
      <div>KDA</div>
      <div>Damage</div>
      <div>Gold</div>
      <div>CS</div>
      <div>Wards</div>
      <div>Items</div>
    </div>
  );
}
