import React from "react";

export default function MatchType({ timeAgo, win, gameTime }) {
  return (
    <div>
      <div className="Match-type">
        <p>Normal Draft</p>
        <p>{timeAgo}</p>
        <p>
          <strong>{win ? "Win" : "Loss"}</strong> {gameTime}
        </p>
      </div>
    </div>
  );
}
