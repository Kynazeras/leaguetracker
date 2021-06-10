const express = require("express");
const router = express.Router();

const axios = require("axios");

const env = require("dotenv").config();
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

const champMasteryUrl = (summonerId) =>
  `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/${apiKeyString}`;

router.get("/details/:summonerName", async (req, res) => {
  const { summonerName } = req.params;
  const summonerDetails = await getSummonerDetails(summonerName);
  res.send(summonerDetails.data);
});

router.get("/rank/:summonerId", async (req, res) => {
  const { summonerId } = req.params;
  const summonerRank = await getSummonerRank(summonerId);
  res.json(summonerRank.data);
});

router.get("/mastery/:summonerId", async (req, res) => {
  const { summonerId } = req.params;
  const summonerMastery = await getSummonerMastery(summonerId);
  res.json(summonerMastery.data.slice(0, 5));
});

const getSummonerDetails = (summonerName) => {
  return axios.get(
    `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}${apiKeyString}`
  );
};

const getSummonerRank = (summonerId) => {
  return axios.get(
    `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}${apiKeyString}`
  );
};

const getSummonerMastery = (summonerId) => {
  return axios.get(
    `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/${apiKeyString}`
  );
};

module.exports = router;
