import React, { useEffect, memo } from "react";

const Needs = memo(
  ({
    pet,
    // flagHPages,
    recoveryEnergy,
    consumptionToilet,
    consumptionMood,
    consumptionFood,
  }) => {
    // Потребности
    let intervalUpdateLocalStorageHunger;
    let intervalUpdateLocalStorageMood;
    let intervalUpdateLocalStorageToilet;
    let intervalUpdateLocalStorageEnergy;
    //
    //   useEffect(() => {

    //   }, [])
    // Голод

    useEffect(() => {
    //   if (!flagHPages) {
        intervalUpdateLocalStorageHunger = null;
        if (pet.satiety > 40) {
          intervalUpdateLocalStorageHunger = setInterval(() => {
            consumptionFood();
          }, 1440000);
        } else if (pet.satiety <= 40) {
          intervalUpdateLocalStorageHunger = setInterval(() => {
            consumptionFood();
          }, 4320000);
        }

        return () => clearInterval(intervalUpdateLocalStorageHunger);
    //   }
    }, [pet]);
    // Настроение
    useEffect(() => {
      intervalUpdateLocalStorageMood = null;
      intervalUpdateLocalStorageMood = setInterval(() => {
        consumptionMood();
      }, 120000);
      return () => clearInterval(intervalUpdateLocalStorageMood);
    }, [pet]);
    // Туалет
    useEffect(() => {
      intervalUpdateLocalStorageToilet = null;
      intervalUpdateLocalStorageToilet = setInterval(() => {
        consumptionToilet();
      }, 576000);
      return () => clearInterval(intervalUpdateLocalStorageToilet);
    }, [pet]);
    // Восстановление усталости
    useEffect(() => {
      intervalUpdateLocalStorageEnergy = null;
      intervalUpdateLocalStorageEnergy = setInterval(() => {
        recoveryEnergy();
      }, 432000);
      return () => clearInterval(intervalUpdateLocalStorageEnergy);
    }, [pet]);

    return <></>;
  }
);

export default Needs;
