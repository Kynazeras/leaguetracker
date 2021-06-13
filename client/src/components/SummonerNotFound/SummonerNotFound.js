import React from 'react';

export default function SummonerNotFound({ summonerName }) {
  return (
    <div style={{ textAlign: 'center', paddingTop: '10%' }}>
      <h1>Oh no! We couldn't find summoner "{summonerName}"</h1>
      <h2>
        Please double check✅✅ you spelling and make sure you selected the
        correct server 🌐
      </h2>
    </div>
  );
}
