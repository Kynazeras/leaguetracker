import React, { Component } from "react";
// axios
import axios from "axios";
// Components
import MatchHistory from "../../components/MatchHistory/MatchHistory";
// Css
import "./SummonerDetails.css";

export default class SummonerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puuid: "",
      summonerLevel: "",
      champions: [],
      matches: [],
    };

    this.getSummonerDetails = this.getSummonerDetails.bind(this);
    this.getMatchHistory = this.getMatchHistory.bind(this);
  }

  componentDidMount() {
    this.getSummonerDetails();
  }

  getSummonerDetails() {
    const { match } = this.props;
    const summonerName = match.params.summonerName;
    axios.get(`/api/summoner/${summonerName}`).then((res) => {
      console.log(res.data);
      const data = res.data;
      const { puuid, summonerLevel } = data;
      this.setState(
        {
          puuid,
          summonerLevel,
        },
        () => {
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
      });
    });
  }

  render() {
    const { match } = this.props;
    const { summonerLevel, matches } = this.state;
    const summonerName = match.params.summonerName;
    return (
      <div className="SummonerDetails">
        <header>
          <h1>
            {summonerName} - {summonerLevel}
          </h1>
        </header>
        <div className="container">
          <div>
            <h1>Test</h1>
          </div>
          <div>
            <MatchHistory matches={matches} />
          </div>
        </div>
      </div>
    );
  }
}
