// axios
import axios from 'axios';

// Rank Images
import IRON from '../images/ranked-emblems/Emblem_Iron.png';
import BRONZE from '../images/ranked-emblems/Emblem_Bronze.png';
import SILVER from '../images/ranked-emblems/Emblem_Silver.png';
import GOLD from '../images/ranked-emblems/Emblem_Gold.png';
import PLATINUM from '../images/ranked-emblems/Emblem_Platinum.png';
import DIAMOND from '../images/ranked-emblems/Emblem_Diamond.png';
import MASTER from '../images/ranked-emblems/Emblem_Master.png';
import GRANDMASTER from '../images/ranked-emblems/Emblem_Grandmaster.png';
import CHALLENGER from '../images/ranked-emblems/Emblem_Challenger.png';

export const timeDifference = (current, previous) => {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + ' seconds ago';
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + ' minutes ago';
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + ' hours ago';
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + ' days ago';
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + ' months ago';
  } else {
    return Math.round(elapsed / msPerYear) + ' years ago';
  }
};

export const getRankedImg = (tier) => {
  const ranksObj = {
    IRON,
    BRONZE,
    SILVER,
    GOLD,
    PLATINUM,
    DIAMOND,
    MASTER,
    GRANDMASTER,
    CHALLENGER,
  };
  const tierLookUp = tier.toUpperCase();
  return ranksObj[tierLookUp];
};

// Match info functions
export const champImg = (champ, currentPatch) => {
  return `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champ}.png`;
};

export const itemImg = (itemId, currentPatch) =>
  `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/item/${itemId}.png`;

export const getRecentPatch = async () => {
  const patches = await axios.get(
    `https://ddragon.leagueoflegends.com/api/versions.json`
  );
  const newestPatch = await patches.data[0];
  return newestPatch;
};

export const getKDA = (kills, deaths, assists) => {
  let ka = kills + assists;
  let deathsToDivide = deaths ? deaths : 1;
  let kda = (ka / deathsToDivide).toFixed(2);
  return kda;
};

export const getTeams = (participants) => {
  const blueSide = participants.filter((person) => person.teamId === 100);
  const redSide = participants.filter((person) => person.teamId === 200);
  return { blueSide, redSide };
};

export const getGameTime = (duration) => {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = '';

  if (hrs > 0) {
    ret += '' + hrs + ':' + (mins < 10 ? '0' : '');
  }

  ret += '' + mins + ':' + (secs < 10 ? '0' : '');
  ret += '' + secs;
  return ret;
};

export const numberWithCommas = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const sortArrayByTimestamp = (arr, timestampField) => {
  arr.sort(function (x, y) {
    return x[timestampField] - y[timestampField];
  });
};

export const regionOptions = [
  { value: 'br1', label: 'BR' },
  { value: 'eun1', label: 'EUN' },
  { value: 'euw1', label: 'EUW' },
  { value: 'jp1', label: 'JP' },
  { value: 'kr', label: 'KR' },
  { value: 'la1', label: 'LAN' },
  { value: 'la2', label: 'LAS' },
  { value: 'na1', label: 'NA' },
  { value: 'oc1', label: 'OC' },
  { value: 'tr1', label: 'TR' },
  { value: 'ru', label: 'RU' },
];
