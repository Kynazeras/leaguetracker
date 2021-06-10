import React from "react";
// Components
import MatchExpandTeamHeader from "./MatchExpandTeamHeader";
import MatchExpandSummoner from "./MatchExpandSummoner";

export default function MatchExpandTeam({ win, color, team }) {
  console.log(team);
  return (
    <div className="MatchExpandTeam">
      <MatchExpandTeamHeader />
      {team.map((summoner) => (
        <MatchExpandSummoner summoner={summoner} key={summoner.puuid} />
      ))}
    </div>
  );
}
