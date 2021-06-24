import React, { Component } from 'react';
// Components
import Match from '../Match/Match';
// Css
import './MatchHistory.css';
// Infinite Scroll
import InfiniteScroll from 'react-infinite-scroll-component';

const getSummonerObj = (participants, puuid) => {
  return participants.find((summoner) => summoner.puuid === puuid);
};

export default class MatchHistory extends Component {
  render() {
    const { matches, puuid, scrollLoadMore, hasMore, currentPatch } =
      this.props;
    return (
      <div className='MatchHistory'>
        {matches.length > 0 ? (
          <InfiniteScroll
            dataLength={matches.length}
            next={scrollLoadMore}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
          >
            {matches.map((match) => (
              <Match
                key={match.gameId}
                summonerObj={getSummonerObj(match.participants, puuid)}
                currentPatch={currentPatch}
                {...match}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <h1 style={{ textAlign: 'center' }}>Match History not found 😢</h1>
        )}
      </div>
    );
  }
}
