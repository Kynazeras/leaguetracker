import React, { Component } from "react";
// axios
import axios from "axios";
// Components
import MatchHistory from "../../components/MatchHistory/MatchHistory";
import Rank from "../../components/SummonerDetails/Rank";
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
    <img src="https://i.gifer.com/PX6F.gif" />
  </div>
);

export default class SummonerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puuid: "",
      summonerLevel: "",
      champions: [],
      matches: [],
      loading: true,
      rankDetails: null,
    };

    this.getSummonerDetails = this.getSummonerDetails.bind(this);
    this.getMatchHistory = this.getMatchHistory.bind(this);
    this.getRankedInfo = this.getRankedInfo.bind(this);
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
      const { puuid, summonerLevel, id } = data;
      this.setState(
        {
          puuid,
          summonerLevel,
        },
        () => {
          this.getRankedInfo(id);
          this.getMatchHistory(this.state.puuid);
        }
      );
    });
  }

  getMatchHistory(puuid) {
    axios.get(`/api/matches/${puuid}`).then((res) => {
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

  render() {
    const { match } = this.props;
    const { summonerLevel, matches, loading, rankDetails, puuid } = this.state;
    const summonerName = match.params.summonerName;
    return (
      <div className="SummonerDetails">
        <header>
          <h1>
            {summonerName} - {summonerLevel}
          </h1>
        </header>
        {loading ? (
          <LoadingDiv />
        ) : (
          <div className="container">
            <div className="rank-container">
              <div className="box">
                <Rank {...rankDetails} />
              </div>
              <div className="box">
                <h2>Winrate</h2>
                <hr />
              </div>
              <div className="box">
                <h2>Best Champ</h2>
                <hr />
              </div>
              <div></div>
            </div>
            <div>
              <MatchHistory matches={matches} puuid={puuid} />
            </div>
          </div>
        )}
      </div>
    );
  }
}
