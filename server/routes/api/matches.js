const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('dotenv').config();
// API Strings
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;
const matchesV5ApiKeyString = `&api_key=${process.env.RIOT_API_KEY}`;

router.get('/:region/bySummonerId/:puuid/:start', async (req, res) => {
  const { region, puuid, start } = req.params;
  try {
    const summonerMatchDetails = await getSummonerMatchDetails(
      region,
      puuid,
      start
    );
    const matchArray = summonerMatchDetails.data;
    let allMatchData = [];
    let promises = gatherMatchPromises(region, matchArray, allMatchData);
    Promise.all(promises)
      .then((results) => {
        res.send(sortArrayByTimestamp(allMatchData, 'gameCreation'));
      })
      .catch((err) => {
        res.send(err);
      });
  } catch (err) {
    console.log(err);
    res.status(404).send('Match details cannot be retrieved at this time');
  }
});

// Functions
const getSummonerMatchDetails = (region, puuid, start) => {
  const routingRegion = getMatchServer(region);
  console.log(routingRegion);
  return axios.get(
    `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=10${matchesV5ApiKeyString}`
  );
};

const getMatchDetails = (region, matchId) => {
  const routingRegion = getMatchServer(region);
  return axios.get(
    `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/${matchId}${apiKeyString}`
  );
};

const gatherMatchPromises = (region, matchArr, dataArr) => {
  let promises = [];
  matchArr.forEach((match) =>
    promises.push(
      getMatchDetails(region, match).then((response) => {
        dataArr.push(response.data.info);
      })
    )
  );
  return promises;
};

const sortArrayByTimestamp = (arr, timestampField) => {
  return arr.sort((x, y) => {
    return y[timestampField] - x[timestampField];
  });
};

// The AMERICAS routing value serves NA, BR, LAN, LAS, and OCE
const americas = ['na1', 'br1', 'la1', 'la2', 'oc1'];
// The ASIA routing value serves KR and JP
const asia = ['kr', 'jp1'];
// The EUROPE routing value serves EUNE, EUW, TR, and RU
const europe = ['eun1', 'euw1', 'tr1', 'ru'];

const getMatchServer = (region) => {
  if (americas.includes(region)) {
    return 'americas';
  }
  if (asia.includes(region)) {
    return 'asia';
  }
  if (europe.includes(region)) {
    return 'europe';
  }
  return 'americas';
};

module.exports = router;
