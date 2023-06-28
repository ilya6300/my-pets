import React, { memo, useEffect, useState, useMemo } from "react";
import EffecrList from "./EffecrList";

const EffectStat = memo(({ pet, myPets, setMyPets }) => {
  const [effectPanel, setEffectPanel] = useState(pet.effect);

  const filterEffect = useMemo(() => {
    return (pet = [...pet.effect].filter((effect) => effect.flag));
  }, [effectPanel]);

  const thisEffect = (effects) => {
    const effectInfo = effectPanel.find((eff) => eff.name === effects.name);

    if (!effectInfo.event) {
      effectInfo.event = true;
    } else {
      effectInfo.event = false;
    }
    effectPanel.forEach((ep) => {
      if (effectInfo.name !== ep.name) {
        ep.event = false;
      }
    });
    setMyPets([...myPets], pet.event);
  };
  // Проверка на действие таблетки от клеща
  let intervalUpdateActiveTabletMite;
  useEffect(() => {
    intervalUpdateActiveTabletMite = null;
    intervalUpdateActiveTabletMite = setInterval(() => {
      chechActiveTabletMite();
    }, 10000);
    return () => clearInterval(intervalUpdateActiveTabletMite);
  }, [pet]);
  useEffect(() => {
    chechActiveTabletMite();
  }, []);

  const chechActiveTabletMite = () => {
    const newTime = new Date();
    pet.forEach((effectBlockMite) => {
      if (effectBlockMite.name === "defend_mite") {
        const oldTime = new Date(effectBlockMite.timer);
        let diff = (newTime.getTime() - oldTime.getTime()) / 1440000;
        console.log(diff * 1);
        if (diff > 1) {
          effectBlockMite.flag = false;
          diff = null;
        }
        setMyPets([...myPets], effectBlockMite.flag);
      }
    });
  };

  useEffect(() => {
    setEffectPanel(filterEffect);
  }, [pet.effect]);

  return (
    <div>
      <EffecrList pet={effectPanel} thiseffect={thisEffect} />
    </div>
  );
});

export default EffectStat;
