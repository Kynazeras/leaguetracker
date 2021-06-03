import React from "react";
// Css
import "./SummonerHeader.css";

export default function SummonerHeader({
  getProfileIcon,
  profileIconId,
  summonerName,
  summonerLevel,
}) {
  return (
    <header className="SummonerHeader">
      <div className="profile-icon">
        <div className="level">{summonerLevel}</div>
        <img src={getProfileIcon(profileIconId)} alt={profileIconId} />
      </div>
      <h1>{summonerName}</h1>
    </header>
  );
}
