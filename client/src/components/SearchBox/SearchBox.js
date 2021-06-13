import React, { Component } from 'react';
// React Router
import { Link } from 'react-router-dom';
// Styles
import './SearchBox.css';

export default class SearchBox extends Component {
  render() {
    const { summonerName, handleChange, region } = this.props;
    return (
      <div className='Searchbox'>
        <input
          type='text'
          value={summonerName}
          onChange={handleChange}
          placeholder='Type Name here'
          name='summonerName'
        />
        <div className='Searchbox-options'>
          {/* <div style={{ color: 'red' }}>TEST</div> */}
          <Link to={`/${region}/summoner/${summonerName}`}>
            <span>ME</span>
          </Link>
        </div>
      </div>
    );
  }
}
