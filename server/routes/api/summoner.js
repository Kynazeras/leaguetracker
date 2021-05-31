const express = require("express");
const router = express.Router();

const axios = require("axios");

const env = require("dotenv").config();
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

router.get("/:summonerName", (req, res) => {
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

module.exports = router;
