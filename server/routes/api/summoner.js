const express = require('express');
const router = express.Router();

const axios = require('axios');

const env = require('dotenv').config();
// axios config
const axiosConfig = require('../../utils/axiosConfig');

router.get('/details/:region/:summonerName', async (req, res) => {
  const { region, summonerName } = req.params;
  try {
    const summonerDetails = await getSummonerDetails(region, summonerName);
    res.send(summonerDetails.data);
  } catch (err) {
    if (err.response.data.status.status_code === 403) {
      res.status(403).send({ message: 'Incorrect API Key' });
    } else {
      res.status(404).send({ message: 'Summoner Not Found' });
    }
  }
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
    `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
    axiosConfig
  );
};

const getSummonerRank = (region, summonerId) => {
  return axios.get(
    `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}`,
    axiosConfig
  );
};

const getSummonerMastery = (region, summonerId) => {
  return axios.get(
    `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}`,
    axiosConfig
  );
};

module.exports = router;
