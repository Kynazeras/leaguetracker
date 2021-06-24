const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/img/:champId', async (req, res) => {
  const { champId } = req.params;
  try {
    const patch = await getRecentPatch();
    const currentPatch = patch.data[0];
    const champs = await getChampList(currentPatch);
    const champList = champs.data.data;
    let champName = findChampName(champList, champId);
    res.send(
      `https://ddragon.leagueoflegends.com/cdn/${currentPatch}/img/champion/${champName}.png`
    );
  } catch (err) {
    res.status(400).json({ error: err.toString() });
  }
});

const getRecentPatch = () => {
  return axios.get(`https://ddragon.leagueoflegends.com/api/versions.json`);
};

const getChampList = (currentPatch) => {
  return axios.get(
    `http://ddragon.leagueoflegends.com/cdn/${currentPatch}/data/en_US/champion.json`
  );
};

const findChampName = (champList, champId) => {
  let champName = '';
  for (var i in champList) {
    if (champList[i].key == champId) {
      champName = champList[i].id;
    }
  }
  return champName;
};

module.exports = router;
