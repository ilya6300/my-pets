import React, { memo, useEffect, useState } from "react";

const GetEffectStreet = memo(({ pet, setBafMeteo, bafMeteo }) => {
  // Получить эффект через
  let resultTimeEffect;
  const getRandomTimeEffect = (min, max) => {
    return (resultTimeEffect = Math.floor(Math.random() * (max - min + 1) + min));
  }
  getRandomTimeEffect(3, 10);
  // 
  useEffect(() => {
    console.log('pet.immunity', pet.immunity)
    console.log((resultTimeEffect * 1000 * pet.immunity)/1000)
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
      }, resultTimeEffect * 1000 * pet.immunity);
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
      }, resultTimeEffect * 1000 * pet.immunity);
    } else if ( // Клещ
      bafMeteo[0].meteo === "Ясная погода" &&
      !pet.effect[1].flag && !pet.effect[5].flag 
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
      }, resultTimeEffect * 1000 * pet.immunity);
    }
  }, [bafMeteo]);

  return <div></div>;
});

export default GetEffectStreet;
