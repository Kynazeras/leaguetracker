import React from "react";
// Components
import TeamList from "./TeamList";

export default function MatchTeams({ teams }) {
  return (
    <div className="Match-teams">
      <TeamList side={teams.blueSide} />
      <TeamList side={teams.redSide} />
    </div>
  );
}
