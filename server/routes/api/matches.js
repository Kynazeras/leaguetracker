const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('dotenv').config();
// API Strings
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;
const matchesV5ApiKeyString = `&api_key=${process.env.RIOT_API_KEY}`;

router.get('/:region/bySummonerId/:puuid', async (req, res) => {
  const { region, puuid } = req.params;
  try {
    const summonerMatchDetails = await getSummonerMatchDetails(region, puuid);
    const matchArray = summonerMatchDetails.data;
    let allMatchData = [];
    let promises = gatherMatchPromises(region, matchArray, allMatchData);
    Promise.all(promises)
      .then((results) => {
        res.send(allMatchData);
      })
      .catch((err) => {
        res.send(err);
      });
  } catch {
    res.status(404).send('Match details cannot be retrieved at this time');
  }
});

// Functions
const getSummonerMatchDetails = (region, puuid) => {
  const routingRegion = region === 'na1' ? 'americas' : 'asia';
  console.log(routingRegion);
  return axios.get(
    `https://${routingRegion}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10${matchesV5ApiKeyString}`
  );
};

const getMatchDetails = (region, matchId) => {
  const routingRegion = region === 'na1' ? 'americas' : 'asia';
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

module.exports = router;
