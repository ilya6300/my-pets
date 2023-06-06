import React, { memo, useEffect, useState } from "react";

const ItesstatInfo = memo((props) => {
  const [stat, setStat] = useState(props.stat)

  useEffect(() => {
    setStat(props.stat)
  }, [props.stat])

  return (
    <div className="statPanel-stat">
    {props.text}{" "}
    <div
      style={{
        width: "100px",
        background: "#958e8e",
      }}
    >
      <div
        style={{
          textAlign: "center",
          color: "azure",
          width: stat + "px",
          background: "#67a52e",
          borderRadius: "4px",
        }}
      >
        {Math.round(stat)}
      </div>
    </div>
  </div>
  );
})

export default ItesstatInfo;
