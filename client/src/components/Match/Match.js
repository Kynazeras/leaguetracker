import React, { Component } from "react";
// Css
import "./Match.css";

const champImg = (champ) =>
  `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champ}.png`;

const getKDA = (kills, deaths, assists) => {
  let ka = kills + assists;
  return (ka / deaths).toFixed(2);
};

export default class Match extends Component {
  render() {
    const { championName, kills, deaths, assists, totalMinionsKilled } =
      this.props;
    return (
      <div className="Match">
        <div className="Match-details">
          <div className="Match-type">
            <p>Normal Draft</p>
            <p>3 days ago</p>
            <p>
              <strong>Loss</strong> 24:06
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
        </div>
      </div>
    );
  }
}
