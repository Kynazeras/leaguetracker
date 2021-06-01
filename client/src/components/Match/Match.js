import React, { Component } from "react";
// Css
import "./Match.css";

const champImg = (champ) =>
  `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champ}.png`;

const getKDA = (kills, deaths, assists) => {
  let ka = kills + assists;
  return (ka / deaths).toFixed(2);
};

const gameTime = (duration) => {
  // Hours, minutes and seconds
  var hrs = ~~(duration / 3600);
  var mins = ~~((duration % 3600) / 60);
  var secs = ~~duration % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  var ret = "";

  if (hrs > 0) {
    ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
  }

  ret += "" + mins + ":" + (secs < 10 ? "0" : "");
  ret += "" + secs;
  return ret;
};

export default class Match extends Component {
  render() {
    const {
      championName,
      kills,
      deaths,
      assists,
      totalMinionsKilled,
      win,
      timePlayed,
    } = this.props;
    return (
      <div className={`Match ${win ? "Match-win" : "Match-lose"}`}>
        <div className="Match-details">
          <div className="Match-type">
            <p>Normal Draft</p>
            <p>3 days ago</p>
            <p>
              <strong>{win ? "Win" : "Loss"}</strong> {gameTime(timePlayed)}
            </p>
          </div>
          <div className="Champ">
            <img src={champImg(championName)} alt="champion" />
            <h2>{championName}</h2>
          </div>
          <div className="Match-KDA">
            <div>
              {kills} / {deaths} / {assists}
            </div>
            <div>
              <strong>{getKDA(kills, deaths, assists)}</strong> KDA
            </div>
            <div>
              <strong>{totalMinionsKilled}</strong> CS
            </div>
          </div>
          <div className="Match-items">
            <div className="item">item</div>
            <div className="item">item</div>
            <div className="item">item</div>
            <div className="item">item</div>
            <div className="item">item</div>
            <div className="item">item</div>
          </div>
          <div className="Match-teams">
            <div className="team-list">
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
            </div>
            <div className="team-list">
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
              <div className="member">member</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
