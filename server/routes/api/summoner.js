const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('dotenv').config();
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

router.get('/details/:region/:summonerName', async (req, res) => {
  const { region, summonerName } = req.params;
  const summonerDetails = await getSummonerDetails(region, summonerName).catch(
    (err) => res.status(404).send('Summoner Not Found')
  );
  res.send(summonerDetails.data);
});

router.get('/rank/:region/:summonerId', async (req, res) => {
  const { region, summonerId } = req.params;
  const summonerRank = await getSummonerRank(region, summonerId);
  res.json(summonerRank.data);
});

router.get('/mastery/:region/:summonerId', async (req, res) => {
  const { region, summonerId } = req.params;
  const summonerMastery = await getSummonerMastery(region, summonerId);
  res.json(summonerMastery.data.slice(0, 5));
});

const getSummonerDetails = (region, summonerName) => {
  return axios.get(
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}${apiKeyString}`
  );
};

const getSummonerRank = (region, summonerId) => {
  return axios.get(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}${apiKeyString}`
  );
};

const getSummonerMastery = (region, summonerId) => {
  return axios.get(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/${apiKeyString}`
  );
};

module.exports = router;
