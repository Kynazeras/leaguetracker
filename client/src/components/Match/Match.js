import React, { Component } from "react";
// Css
import "./Match.css";
// Util functions
import { timeDifference } from "../../constants/util-functions";

const champImg = (champ) =>
  `https://ddragon.leagueoflegends.com/cdn/11.10.1/img/champion/${champ}.png`;

const itemImg = (itemId) =>
  `http://ddragon.leagueoflegends.com/cdn/11.11.1/img/item/${itemId}.png`;

const getKDA = (kills, deaths, assists) => {
  let ka = kills + assists;
  return (ka / deaths).toFixed(2);
};

const getTeams = (participants) => {
  const blueSide = participants.filter((person) => person.teamId === 100);
  const redSide = participants.filter((person) => person.teamId === 200);
  return { blueSide, redSide };
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
      item0,
      item1,
      item2,
      item3,
      item4,
      item5,
    } = this.props.summonerObj;
    const { gameCreation } = this.props;
    const items = [item0, item1, item2, item3, item4, item5];
    // console.log(this.props);
    const teams = getTeams(this.props.participants);
    return (
      <div className={`Match ${win ? "Match-win" : "Match-lose"}`}>
        <div className="Match-details">
          <div className="Match-type">
            <p>Normal Draft</p>
            <p>{timeDifference(new Date(), gameCreation)}</p>
            <p>
              <strong>{win ? "Win" : "Loss"}</strong> {gameTime(timePlayed)}
            </p>
          </div>
          <div className="Champ">
            <img src={champImg(championName)} alt={championName} />
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
          <div className="items">
            <div className="Match-items">
              {items.map((item) => (
                <React.Fragment>
                  {item ? (
                    <img
                      key={item}
                      className="item"
                      src={itemImg(item)}
                      alt={item}
                    />
                  ) : (
                    <div key={item} className="item no-item"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="Match-teams">
            <div className="team-list">
              {teams.blueSide.map((summoner) => (
                <div className="summoner" key={summoner.championName}>
                  <div className="champ-img">
                    <img
                      src={champImg(summoner.championName)}
                      alt={summoner.championName}
                    />
                  </div>
                  <div className="summoner-name">
                    <span>{summoner.summonerName}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="team-list">
              {teams.redSide.map((summoner) => (
                <div className="summoner" key={summoner.championName}>
                  <div className="champ-img">
                    <img
                      src={champImg(summoner.championName)}
                      alt={summoner.championName}
                    />
                  </div>
                  <div className="summoner-name">
                    <span>{summoner.summonerName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
