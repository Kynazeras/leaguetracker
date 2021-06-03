const express = require("express");
const router = express.Router();

const axios = require("axios");

const env = require("dotenv").config();
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

const champMasteryUrl = (summonerId) =>
  `https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${summonerId}/${apiKeyString}`;

router.get("/details/:summonerName", (req, res) => {
  const { summonerName } = req.params;
  axios
    .get(
      `https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}${apiKeyString}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/rank/:summonerId", (req, res) => {
  const { summonerId } = req.params;
  axios
    .get(
      `https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerId}${apiKeyString}`
    )
    .then((response) => {
      res.json(response.data);
    })
    .catch((e) => {
      console.log(e);
    });
});

router.get("/mastery/:summonerId", (req, res) => {
  const { summonerId } = req.params;
  axios
    .get(champMasteryUrl(summonerId))
    .then((response) => {
      res.json(response.data.slice(0, 5));
    })
    .catch((e) => {
      console.log(e);
    });
});

module.exports = router;
