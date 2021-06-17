import React, { Component } from 'react';
// Css
import './Match.css';
// Util functions
import {
  timeDifference,
  champImg,
  getKDA,
  getTeams,
  getGameTime,
} from '../../constants/util-functions';
// Components
import MatchType from './MatchType';
import Champ from './MatchChamp';
import MatchKDA from './MatchKDA';
import MatchItems from './MatchItems';
import MatchTeams from './MatchTeams';
// Icons
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from 'react-icons/fa';
import MatchExpand from './MatchExpand/MatchExpand';

export default class Match extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };

    this.show = this.show.bind(this);
  }

  show() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

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
    const { show } = this.state;
    const { gameCreation } = this.props;
    const items = [item0, item1, item2, item3, item4, item5];
    const teams = getTeams(this.props.participants);
    return (
      <div>
        <div
          className={`Match ${win ? 'Match-win' : 'Match-lose'} ${
            show ? 'expanded' : ''
          }`}
        >
          <div className='Match-details'>
            <MatchType
              timeAgo={timeDifference(new Date(), gameCreation)}
              win={win}
              gameTime={getGameTime(timePlayed)}
            />
            <Champ
              imgSrc={champImg(championName)}
              championName={championName}
            />
            <MatchKDA
              kills={kills}
              deaths={deaths}
              assists={assists}
              kda={getKDA(kills, deaths, assists)}
              totalMinionsKilled={totalMinionsKilled}
            />
            <MatchItems items={items} />
            <MatchTeams teams={teams} />
            <div className='Match-show'>
              {show ? (
                <FaArrowAltCircleUp onClick={this.show} />
              ) : (
                <FaArrowAltCircleDown onClick={this.show} />
              )}
            </div>
          </div>
        </div>
        {show ? <MatchExpand win={win} teams={teams} /> : null}
      </div>
    );
  }
}
