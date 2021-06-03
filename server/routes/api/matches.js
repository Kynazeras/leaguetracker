const express = require("express");
const router = express.Router();

const axios = require("axios");

const env = require("dotenv").config();
// API Strings
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;
const matchesV5ApiKeyString = `&api_key=${process.env.RIOT_API_KEY}`;

router.get("/bySummonerId/:puuid", (req, res) => {
  const { puuid } = req.params;
  getSummonerDetails(puuid)
    .then((response) => {
      const matchArray = response.data;
      let allMatchData = [];
      let promises = gatherMatchPromises(matchArray, allMatchData);
      Promise.all(promises).then((results) => {
        res.send(allMatchData);
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

// Functions
const getSummonerDetails = (puuid) => {
  return axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10${matchesV5ApiKeyString}`
  );
};

const getMatchDetails = (matchId) => {
  return axios.get(
    `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}${apiKeyString}`
  );
};

const gatherMatchPromises = (matchArr, dataArr) => {
  let promises = [];
  matchArr.forEach((match) =>
    promises.push(
      getMatchDetails(match).then((response) => {
        dataArr.push(response.data.info);
      })
    )
  );
  return promises;
};

module.exports = router;
