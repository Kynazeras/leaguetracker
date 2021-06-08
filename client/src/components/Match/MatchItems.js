import React from "react";
// constants
import { itemImg } from "../../constants/util-functions";

export default function MatchItems({ items }) {
  return (
    <div className="items">
      <div className="Match-items">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            {item ? (
              <img className="item" src={itemImg(item)} alt={item} />
            ) : (
              <div className="item no-item"></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
