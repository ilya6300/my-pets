import React, { memo, useEffect, useState } from "react";

const GetEffectStreet = memo(({ pet, setBafMeteo, bafMeteo }) => {
  //   const [bafMeteo, setBafMeteo] = useState(pet.currentMeteo)
  useEffect(() => {
    setBafMeteo(bafMeteo);
    if (bafMeteo[0].meteo === "Дождь" && pet.effect[3].flag !== true) {
      setTimeout(() => {
        pet.effect[0].flag = false;
        pet.effect[3].flag = true;
        pet.max_energy = 40;
        if (pet.energy > 40) {
          pet.energy = 40;
        }
        pet.max_mood = 40;
        if (pet.mood > 40) {
          pet.mood = 40;
        }
        pet.max_satiety = 40;
        if (pet.satiety > 40) {
          pet.satiety = 40;
        }
      }, 3000);
    } else if (
      bafMeteo[0].meteo === "Очень жарко" &&
      pet.effect[2].flag !== true
    ) {
      setTimeout(() => {
        pet.effect[0].flag = false;
        pet.effect[2].flag = true;
        pet.max_energy = 40;
        if (pet.energy > 40) {
          pet.energy = 40;
        }
        pet.max_mood = 40;
        if (pet.mood > 40) {
          pet.mood = 40;
        }
        pet.max_satiety = 40;
        if (pet.satiety > 40) {
          pet.satiety = 40;
        }
      }, 3000);
    } else if ( // Клещ
      bafMeteo[0].meteo === "Ясная погода" &&
      !pet.effect[1].flag && !pet.miteDefends 
    ) {
      setTimeout(() => {
        pet.effect[0].flag = false;
        pet.effect[1].flag = true;
        pet.max_energy = 40;
        if (pet.energy > 40) {
          pet.energy = 40;
        }
        pet.max_mood = 40;
        if (pet.mood > 40) {
          pet.mood = 40;
        }
        pet.max_satiety = 40;
        if (pet.satiety > 40) {
          pet.satiety = 40;
        }
      }, 3000);
    }
  }, [bafMeteo]);

  return <div></div>;
});

export default GetEffectStreet;
