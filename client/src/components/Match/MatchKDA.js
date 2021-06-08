import React from "react";

export default function MatchKDA({
  kills,
  deaths,
  assists,
  kda,
  totalMinionsKilled,
}) {
  return (
    <div className="Match-KDA">
      <div>
        {kills} / {deaths} / {assists}
      </div>
      <div>
        <strong>{kda}</strong> KDA
      </div>
      <div>
        <strong>{totalMinionsKilled}</strong> CS
      </div>
    </div>
  );
}
