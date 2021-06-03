import React, { Component } from "react";
// axios
import axios from "axios";
// Components
import SummonerHeader from "../../components/SummonerDetails/SummonerHeader/SummonerHeader";
import MatchHistory from "../../components/MatchHistory/MatchHistory";
import Rank from "../../components/SummonerDetails/Rank/Rank";
// Css
import "./SummonerDetails.css";

const LoadingDiv = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <img src="https://i.gifer.com/PX6F.gif" alt="spinner" />
  </div>
);

const getProfileIcon = (iconId) => {
  return `http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${iconId}.png`;
};

export default class SummonerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puuid: "",
      summonerLevel: "",
      profileIconId: "",
      champions: [],
      matches: [],
      loading: false,
      rankDetails: null,
      bestChampImg: "",
    };

    this.getSummonerDetails = this.getSummonerDetails.bind(this);
    this.getMatchHistory = this.getMatchHistory.bind(this);
    this.getRankedInfo = this.getRankedInfo.bind(this);
    this.getChampMastery = this.getChampMastery.bind(this);
  }

  componentDidMount() {
    this.getSummonerDetails();
  }

  getSummonerDetails() {
    const { match } = this.props;
    const summonerName = match.params.summonerName;
    axios.get(`/api/summoner/details/${summonerName}`).then((res) => {
      console.log(res.data);
      const data = res.data;
      const { puuid, summonerLevel, id, profileIconId } = data;
      console.log(data);
      this.setState(
        {
          puuid,
          summonerLevel,
          profileIconId,
        },
        () => {
          this.getRankedInfo(id);
          this.getChampMastery(id);
          this.getMatchHistory(this.state.puuid);
        }
      );
    });
  }

  getMatchHistory(puuid) {
    axios.get(`/api/matches/bySummonerId/${puuid}`).then((res) => {
      console.log(res.data);
      this.setState({
        matches: res.data,
        loading: false,
      });
    });
  }

  getRankedInfo(id) {
    axios.get(`/api/summoner/rank/${id}`).then((res) => {
      console.log(res.data);
      this.setState({
        rankDetails: res.data[0],
      });
    });
  }

  // Winrate chart

  // Top Champs
  getChampMastery(id) {
    axios.get(`/api/summoner/mastery/${id}`).then((res) => {
      console.log(res.data);
      axios.get(`/api/champs/${res.data[0].championId}`).then((res) => {
        console.log(res.data);
        this.setState({
          bestChampImg: res.data,
        });
      });
    });
  }

  render() {
    const { match } = this.props;
    const {
      summonerLevel,
      matches,
      loading,
      rankDetails,
      puuid,
      profileIconId,
      bestChampImg,
    } = this.state;
    const summonerName = match.params.summonerName;
    return (
      <div className="SummonerDetails">
        <SummonerHeader
          getProfileIcon={getProfileIcon}
          profileIconId={profileIconId}
          summonerName={summonerName}
          summonerLevel={summonerLevel}
        />
        {loading ? (
          <LoadingDiv />
        ) : (
          <div className="container">
            <section className="rank-container">
              <div className="box">
                <Rank {...rankDetails} />
              </div>
              <div className="box">
                <h2>Winrate</h2>
                <hr />
                <h1>Test</h1>
                <h1>Test</h1>
              </div>
              <div className="box">
                <h2>Best Champ</h2>
                <hr />
                {bestChampImg && (
                  <img
                    src={bestChampImg}
                    alt="best champion"
                    style={{ height: "5rem", width: "5rem" }}
                  />
                )}
              </div>
              <div className="empty"></div>
            </section>
            <section>
              <MatchHistory matches={matches} puuid={puuid} />
            </section>
          </div>
        )}
      </div>
    );
  }
}
