import React, { memo } from "react";

const EffectItemIcon = memo((props) => {
  return (
    <>
      <img
        className="img-effect"
        onClick={() => props.thiseffect(props.effects)}
        src={props.effects.icon}
      />
      {props.effects.event ? (
        <p className="info-effect">{props.effects.info}</p>
      ) : (
        <></>
      )}
    </>
  );
});

export default EffectItemIcon;
