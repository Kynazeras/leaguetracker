const env = require('dotenv').config();

const axiosConfig = {
  headers: {
    'X-Riot-Token': process.env.RIOT_API_KEY,
  },
};

module.exports = axiosConfig;
