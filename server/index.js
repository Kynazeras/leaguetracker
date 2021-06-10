const express = require("express");
const env = require("dotenv").config();
const axios = require("axios");

const path = require("path");

const app = express();

const apiKeyString = `?api_key=${process.env.RIOT_API_KEY}`;

//Serve Client
app.use(express.static(path.join(__dirname, "../client/build")));
// Routes
const summonerRoutes = require("./routes/api/summoner");
const matchRoutes = require("./routes/api/matches");
const champRoutes = require("./routes/api/champs");
// Routers
app.use("/api/summoner", summonerRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/champs", champRoutes);

//Set the port that you want the server to run on
const port = process.env.PORT || 8080;
app.listen(port);
console.log("App is listening on port " + port);
