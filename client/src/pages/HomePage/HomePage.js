import React, { Component } from 'react';
// Components
import SearchBox from '../../components/SearchBox/SearchBox';
// Styles
import './Homepage.css';
// Images
import logo from '../../images/lolme.png';

export default class HomePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      summonerName: 'Kynazeras',
      region: 'na1',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  getSummonerDetails() {
    const { summonerName } = this.state;
    console.log(summonerName);
  }

  render() {
    const { summonerName, region } = this.state;
    return (
      <div className='Homepage'>
        <img
          // src='https://play-lh.googleusercontent.com/UdvXlkugn0bJcwiDkqHKG5IElodmv-oL4kHlNAklSA2sdlVWhojsZKaPE-qFPueiZg'
          src={logo}
          alt='op.gg logo'
        />
        <SearchBox
          summonerName={summonerName}
          region={region}
          handleChange={this.handleChange}
        />
      </div>
    );
  }
}
