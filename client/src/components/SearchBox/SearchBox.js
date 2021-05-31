import React, { Component } from "react";
// React Router
import { Link } from "react-router-dom";
// Styles
import "./SearchBox.css";

export default class SearchBox extends Component {
  render() {
    const { summonerName, handleChange } = this.props;
    return (
      <div className="Searchbox">
        <input
          type="text"
          value={summonerName}
          onChange={handleChange}
          placeholder="Type Name here"
          name="summonerName"
        />
        <Link to={`/summoner/${summonerName}`}>
          <span>GG</span>
        </Link>
      </div>
    );
  }
}
