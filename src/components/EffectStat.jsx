import React, { memo, useEffect, useState } from "react";

const EffectStat = memo(({ pet, setBafMeteo, bafMeteo, setMyPets, myPets }) => {
  const [effNorm, setEffNorm] = useState(false);
  const effNormFncOn = () => {
    console.log("effNormFnc");
    pet.effect[0].event = true;
    // setMyPets([...myPets], pet.effect[0].event);
  };
  const effColdFncOn = () => {
    console.log("effNormFnc");
    pet.effect[3].event = true;
    // setMyPets([...myPets], pet.effect[3].event);
  };
  const effHeatFncOn = () => {
    console.log("effNormFnc");
    pet.effect[2].event = true;
    // setMyPets([...myPets], pet.effect[2].event);
  };
  const effNormFncOff = () => {
    console.log("effNormFnc");
    pet.effect[0].event = false;
    // setMyPets([...myPets], pet.effect[0].event);
  };
  const effColdFncOff = () => {
    console.log("effNormFnc");
    pet.effect[3].event = false;
    // setMyPets([...myPets], pet.effect[3].event);
  };
  const effHeatFncOff = () => {
    console.log("effNormFnc");
    pet.effect[2].event = false;
    // setMyPets([...myPets], pet.effect[2].event);
  };
  return (
    <div>
      {pet.effect[0].flag ? (
        <>
          <img
            className="img-effect"
            src={pet.effect[0].icon}
            alt=""
            onTouchStart={effNormFncOn}
            onTouchEnd={effNormFncOff}
          />
          {pet.effect[0].event ? (
            <p className="info-effect">{pet.effect[0].info}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {pet.effect[2].flag ? (
        <>
          <img
            className="img-effect"
            src={pet.effect[2].icon}
            alt=""
            onTouchStart={effHeatFncOn}
            onTouchEnd={effHeatFncOff}
          />
          {pet.effect[2].event ? (
            <p className="info-effect">{pet.effect[2].info}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
      {pet.effect[3].flag ? (
        <>
          <img
            className="img-effect"
            src={pet.effect[3].icon}
            alt=""
            onTouchStart={effColdFncOn}
            onTouchEnd={effColdFncOff}
          />
          {pet.effect[3].event ? (
            <p className="info-effect">{pet.effect[3].info}</p>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

export default EffectStat;
