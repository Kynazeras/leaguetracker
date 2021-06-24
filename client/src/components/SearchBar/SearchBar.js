import React, { Component } from 'react';
//React Router
import { Link } from 'react-router-dom';
// React Select
import Select from 'react-select';
// Css
import './SearchBar.css';
import '../SearchBar/SearchBar.css';

export default class SearchBar extends Component {
  render() {
    return (
      <div className='SearchBar'>
        <div className='Searchbox'>
          <input
            type='text'
            //   value={summonerName}
            //   onChange={handleChange}
            placeholder='Type Name here'
            name='summonerName'
            //   onKeyDown={handlePressEnter}
          />
          <div className='Searchbox-options'>
            <div className='region'>
              <Select
                //   options={options}
                placeholder='Region'
                //   value={region}
                //   onChange={handleRegionChange}
                className='react-select'
              />
            </div>
            <Link>
              <span>ME</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
