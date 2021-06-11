import React from 'react';
// Css
import './MatchExpand.css';
// Constants
import {
  champImg,
  getKDA,
  itemImg,
  numberWithCommas,
} from '../../../constants/util-functions';

export default function MatchExpandSummoner({ summoner }) {
  const {
    championName,
    summonerName,
    kills,
    deaths,
    assists,
    totalDamageDealtToChampions,
    totalMinionsKilled,
    goldEarned,
    wardsPlaced,
    item0,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6,
  } = summoner;
  const items = [item0, item1, item2, item3, item4, item5, item6];
  return (
    <div className='MatchExpandSummoner'>
      <div className='champ'>
        <img src={champImg(championName)} alt={championName} />
        <span>{summonerName}</span>
      </div>
      <div className='MatchExpandSummoner-kda'>
        <span>
          {kills}/{deaths}/{assists}
        </span>
        <span>{getKDA(kills, deaths, assists)} KDA</span>
      </div>
      <div>{numberWithCommas(totalDamageDealtToChampions)}</div>
      <div>{numberWithCommas(goldEarned)}</div>
      <div>{totalMinionsKilled}</div>
      <div>{wardsPlaced}</div>
      <div>
        {items.map((item) => (
          <React.Fragment>
            {item ? (
              <img
                style={{ width: '1.5rem', height: '1.5rem' }}
                src={itemImg(item)}
              />
            ) : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
