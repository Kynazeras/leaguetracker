import React, { Component } from 'react';
// React - Router
import { Redirect } from 'react-router-dom';
// axios
import axios from 'axios';
// Components
import SummonerHeader from '../../components/SummonerDetails/SummonerHeader/SummonerHeader';
import MatchHistory from '../../components/MatchHistory/MatchHistory';
import Rank from '../../components/SummonerDetails/Rank/Rank';
import SummonerNotFound from '../../components/SummonerNotFound/SummonerNotFound';
// Css
import './SummonerDetails.css';
// Constants
import { numberWithCommas } from '../../constants/util-functions';
// Error Boundary
import ErrorBoundary from '../../ErrorBoundary';

const LoadingDiv = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <img src='https://i.gifer.com/PX6F.gif' alt='spinner' />
  </div>
);

const getProfileIcon = (iconId) => {
  return `http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${iconId}.png`;
};

export default class SummonerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      puuid: '',
      summonerLevel: '',
      profileIconId: '',
      champions: [],
      matches: [],
      loading: true,
      rankDetails: null,
      bestChampImg: '',
      bestChampLvl: '',
      bestChampPoints: '',
      error: false,
      start: 0,
      region: '',
      hasMore: true,
      summonerNotFound: false,
    };

    this.getSummonerDetails = this.getSummonerDetails.bind(this);
    this.getMatchHistory = this.getMatchHistory.bind(this);
    this.getRankedInfo = this.getRankedInfo.bind(this);
    this.getChampMastery = this.getChampMastery.bind(this);
    this.setError = this.setError.bind(this);
    this.scrollLoadMore = this.scrollLoadMore.bind(this);
  }

  componentDidMount() {
    this.getSummonerDetails();
  }

  getSummonerDetails() {
    const { match } = this.props;
    const summonerName = match.params.summonerName;
    const region = match.params.region;
    axios
      .get(`/api/summoner/details/${region}/${summonerName}`)
      .then((res) => {
        const data = res.data;
        const { puuid, summonerLevel, id, profileIconId } = data;
        this.setState(
          {
            puuid,
            summonerLevel,
            profileIconId,
            region: region,
          },
          () => {
            this.getRankedInfo(region, id);
            this.getChampMastery(region, id);
            this.getMatchHistory();
          }
        );
      })
      .catch((err) => {
        console.log(err.response.status);
        if (err.response.status === 404) {
          this.setState({
            summonerNotFound: true,
          });
        } else {
          this.setError(true);
        }
      });
  }

  getMatchHistory() {
    const { matches, start, puuid, region } = this.state;
    axios
      .get(`/api/matches/${region}/bySummonerId/${puuid}/${start}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          matches: Array.isArray(res.data) ? res.data : [],
          loading: false,
          // start: start + 10,
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setError(true);
      });
  }

  getRankedInfo(region, id) {
    axios
      .get(`/api/summoner/rank/${region}/${id}`)
      .then((res) => {
        this.setState({
          rankDetails: res.data[0],
        });
      })
      .catch((err) => {
        console.log(err.message);
        this.setError(true);
      });
  }

  // Winrate chart

  // Top Champs
  async getChampMastery(region, id) {
    try {
      const champMasteries = await axios.get(
        `/api/summoner/mastery/${region}/${id}`
      );
      const bestChamp = champMasteries.data[0];
      const { championId, championLevel, championPoints } = bestChamp;
      const champImg = await axios.get(`/api/champs/img/${championId}`);
      this.setState({
        bestChampImg: champImg.data,
        bestChampLvl: championLevel,
        bestChampPoints: championPoints,
      });
    } catch (err) {
      console.log(err.message);
      this.setError(true);
    }
  }

  setError(bool) {
    this.setState({
      error: bool,
    });
  }

  scrollLoadMore() {
    const { matches } = this.state;
    this.setState(
      {
        matches: [...matches, ...matches],
      },
      () => {
        this.setState({
          hasMore: false,
        });
      }
    );
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
      bestChampLvl,
      bestChampPoints,
      error,
      hasMore,
      summonerNotFound,
    } = this.state;
    const summonerName = match.params.summonerName;

    if (summonerNotFound) {
      return <SummonerNotFound summonerName={summonerName} />;
    }
    if (error) {
      return <Redirect to='/Error' />;
    }
    return (
      <ErrorBoundary>
        <div className='SummonerDetails'>
          <SummonerHeader
            getProfileIcon={getProfileIcon}
            profileIconId={profileIconId}
            summonerName={summonerName}
            summonerLevel={summonerLevel}
          />
          {loading ? (
            <LoadingDiv />
          ) : (
            <div className='container'>
              <section className='rank-container'>
                <div className='box Rank'>
                  <Rank {...rankDetails} />
                </div>
                <div className='box'>
                  <h2>Winrate</h2>
                  <hr />
                </div>
                <div className='box'>
                  <h2>Best Champ</h2>
                  <hr />
                  {bestChampImg && (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <img
                        src={bestChampImg}
                        alt='best champion'
                        style={{
                          height: '5rem',
                          width: '5rem',
                          marginRight: '1rem',
                        }}
                      />
                      <div>
                        <p>Mastery Level: {bestChampLvl}</p>
                        <p>
                          Mastery Points: {numberWithCommas(bestChampPoints)}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className='empty'></div>
              </section>
              <section
                className='SummonerDetails-MatchHistory'
                hasMore={hasMore}
              >
                <MatchHistory
                  matches={matches}
                  puuid={puuid}
                  scrollLoadMore={this.scrollLoadMore}
                  hasMore={false}
                />
              </section>
            </div>
          )}
        </div>
      </ErrorBoundary>
    );
  }
}
