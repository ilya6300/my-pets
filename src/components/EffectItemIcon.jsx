import React from "react";

const EffectItemIcon = (props) => {

//   const effInfoOn = () => {
//     console.log(props.event);
//     props.event = true;
//       };

  return (
    <>
      <img
        className="img-effect"
        src={props.effect.icon}
        alt=""
        // onTouchStart={effInfoOn}
        // onClick={effInfoOn}
        // onTouchEnd={effInfoOff}
      />
      {props.effect.event ? (
        <p className="info-effect">{props.effect.info}</p>
      ) : (
        <></>
      )}
    </>
  );
};

export default EffectItemIcon;
