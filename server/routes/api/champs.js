const express = require("express");
const router = express.Router();

const axios = require("axios");

const env = require("dotenv").config();
const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

router.get("/:champId", async (req, res) => {
  const { champId } = req.params;
  const champs = await getChampList();
  const champList = champs.data.data;
  let champName = findChampName(champList, champId);
  res.send(
    `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champName}.png`
  );
});

const getChampList = () => {
  return axios.get(
    `http://ddragon.leagueoflegends.com/cdn/11.11.1/data/en_US/champion.json`
  );
};

const findChampName = (champList, champId) => {
  let champName = "";
  for (var i in champList) {
    if (champList[i].key == champId) {
      champName = champList[i].id;
    }
  }
  return champName;
};

module.exports = router;
