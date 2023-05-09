import React, { useState } from "react";

const ItesstatInfo = (props) => {
    const [stat] = useState(props.stat)
    const [style] = useState(props.style)
  return (
    <div className="statPanel-stat">
        {props.text}
        <div
          style={{
            width: "100px",
            background: "#958e8e",
          }}
        >
          <div style={style}>            
            {stat}
          </div>
        </div>
    </div>
  );
};

export default ItesstatInfo;
