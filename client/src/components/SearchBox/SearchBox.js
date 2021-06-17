import React, { Component } from 'react';
// React Router
import { Link } from 'react-router-dom';
// React Select
import Select from 'react-select';
// Styles
import './SearchBox.css';

export default class SearchBox extends Component {
  render() {
    const { summonerName, handleChange, region, options, handleRegionChange } =
      this.props;
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
          <div className='region'>
            <Select
              options={options}
              placeholder='Region'
              value={region}
              onChange={handleRegionChange}
              className='react-select'
            />
          </div>
          <Link to={`/${region.value}/summoner/${summonerName}`}>
            <span>ME</span>
          </Link>
        </div>
      </div>
    );
  }
}
