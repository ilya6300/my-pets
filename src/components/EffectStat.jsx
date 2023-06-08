import React, { memo, useEffect, useState, useMemo } from "react";
import EffectItemIcon from "./EffectItemIcon";
import EffecrList from "./EffecrList";

const EffectStat = memo(({ pet, setBafMeteo, bafMeteo, setMyPets, myPets }) => {
  const [effectPanel, setEffectPanel] = useState(pet.effect);
  // const [effNorm, setEffNorm] = useState(false);
  // const effNormFncOn = () => {
  //   console.log("effNormFnc");
  //   pet.effect[0].event = true;
  //   // setMyPets([...myPets], pet.effect[0].event);
  // };
  // const effColdFncOn = () => {
  //   console.log("effNormFnc");
  //   pet.effect[3].event = true;
  //   // setMyPets([...myPets], pet.effect[3].event);
  // };
  // const effHeatFncOn = () => {
  //   console.log("effNormFnc");
  //   pet.effect[2].event = true;
  //   // setMyPets([...myPets], pet.effect[2].event);
  // };
  // const effNormFncOff = () => {
  //   console.log("effNormFnc");
  //   pet.effect[0].event = false;
  //   // setMyPets([...myPets], pet.effect[0].event);
  // };
  // const effColdFncOff = () => {
  //   console.log("effNormFnc");
  //   pet.effect[3].event = false;
  //   // setMyPets([...myPets], pet.effect[3].event);
  // };
  // const effHeatFncOff = () => {
  //   console.log("effNormFnc");
  //   pet.effect[2].event = false;
  //   // setMyPets([...myPets], pet.effect[2].event);
  // };
  // let effectPanel = pet;
  // console.log(effectPanel)
  const filterEffect = useMemo(() => {
    // effectPanel = pet;
    return (pet = [...pet.effect].filter((effect) => effect.flag));
    //  setEffectPanel(filterEffect)
    // return effectPanel
    // return setEffectPanel(effectPanel);
  }, [effectPanel]);

  useEffect(() => {
    setEffectPanel(filterEffect);
  }, [pet.effect]);

  return (
    <div>
      <EffecrList pet={effectPanel} />
    </div>
  );
});

export default EffectStat;
