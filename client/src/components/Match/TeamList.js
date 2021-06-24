import React from 'react';
// constants
import { champImg } from '../../constants/util-functions';

export default function TeamList({ side, currentPatch }) {
  return (
    <div className='team-list'>
      {side.map((summoner) => (
        <div className='summoner' key={summoner.championName}>
          <div className='champ-img'>
            <img
              src={champImg(summoner.championName, currentPatch)}
              alt={summoner.championName}
            />
          </div>
          <div className='summoner-name'>
            <span>{summoner.summonerName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
