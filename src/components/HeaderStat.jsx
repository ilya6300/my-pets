import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItesstatInfo from "./ItesstatInfo";

const HeaderStat = ({ pet, myPets, setMyPets, setImgPet }) => {
  // Цветовая индикация стат бара

  // Команды
  const [comandShow, setComandShow] = useState(false);
  // Потребности
  let intervalUpdateLocalStorageHunger;
  let intervalUpdateLocalStorageMood;
  let intervalUpdateLocalStorageToilet;
  let intervalUpdateLocalStorageEnergy;

  // Голод
  useEffect(() => {
    intervalUpdateLocalStorageHunger = null;
    intervalUpdateLocalStorageHunger = setInterval(() => {
      consumptionFood();
      // Расчёт здоровья
    }, 150000);
    return () => clearInterval(intervalUpdateLocalStorageHunger);
  }, [pet]);
  // Настроение
  useEffect(() => {
    intervalUpdateLocalStorageMood = null;
    intervalUpdateLocalStorageMood = setInterval(() => {
      consumptionMood();
      // Расчёт здоровья
    }, 210000);
    return () => clearInterval(intervalUpdateLocalStorageMood);
  }, [pet]);
  // Туалет
  useEffect(() => {
    intervalUpdateLocalStorageToilet = null;
    intervalUpdateLocalStorageToilet = setInterval(() => {
      consumptionToilet();
      // Расчёт здоровья
    }, 190000);
    return () => clearInterval(intervalUpdateLocalStorageToilet);
  }, [pet]);
// Восстановление усталости 
useEffect(() => {
  intervalUpdateLocalStorageEnergy = null;
  intervalUpdateLocalStorageEnergy = setInterval(() => {
    recoveryEnergy();
    // Расчёт здоровья
  }, 15000);
  return () => clearInterval(intervalUpdateLocalStorageEnergy);
}, [pet]);
  // Расход потребностей
  // Голод
  const consumptionFood = () => {
    if (pet.satiety > 0) {
      const newTime = new Date();
      const oldTime = new Date(pet.end_food);
      const diff = (newTime.getTime() - oldTime.getTime()) / 150000;
      pet.satiety = pet.satiety - diff * 1;
      pet.end_food = newTime;
    }
    // Расчёт голода конец
    setMyPets([...myPets], pet.end_food);
  };
  // Настроение
  const consumptionMood = () => {
    if (pet.mood > 0) {
      const newTime = new Date();
      const oldTime = new Date(pet.time_game);
      const diff = (newTime.getTime() - oldTime.getTime()) / 210000;
      pet.mood = pet.mood - diff * 1;
      pet.time_game = newTime;
    }
    // pet.mood = Math.round(pet.mood - diff * 1);
    // pet.time_game = newTime;
    setMyPets([...myPets], pet.time_game);
  };
  // Туалет
  const consumptionToilet = () => {
    const newTime = new Date();
    if (pet.toilet > 0 && !pet.shit) {
      // newTime = new Date();
      const oldTime = new Date(pet.end_toilet);
      const diff = (newTime.getTime() - oldTime.getTime()) / 190000;
      pet.toilet = pet.toilet - diff * 1;
      pet.end_toilet = newTime;
    } else if (!pet.shit) {
      pet.shit = true;
      pet.toilet = 100;
      // pet.end_toilet = newTime;
    } else {
      return;
    }
    // pet.toilet = Math.round(pet.toilet - diff * 1);
    // pet.end_toilet = newTime;
    setMyPets([...myPets], pet.end_toilet);
  };
    // Восстановленние усталости
    const recoveryEnergy = () => {

      // if (pet.energy <= 100) {
        const newTime = new Date();
        const oldTime = new Date(pet.end_energy);
        const diff = (newTime.getTime() - oldTime.getTime()) / 15000;
        console.log('diff', diff)
        console.log('pet.energy', pet.energy)
        pet.energy = pet.energy + diff * 1;
        pet.end_energy = newTime;
      // }
      // Расчёт голода конец
      setMyPets([...myPets], pet.energy);
    };
  //   Купить вкусняшки
  const buyDelicacy = () => {
    console.log(comandShow);
    if (pet.money >= 2) {
      pet.money = pet.money - 2;
      pet.delicacy++;
    }
    setMyPets([...myPets], pet.delicacy);
  };
  //   Команды

  const showComandF = () => {
    {
      !comandShow ? setComandShow(true) : setComandShow(false);
    }
  };
  // Рандомная функция до 100
  let resultObedience;
  const getObedience = (max) => {
    return (resultObedience = Math.floor(Math.random() * max));
  };
  // Команда "Сидеть"
  const comandSit = () => {
    console.log(pet.comsndSitStudied);
    if (pet.delicacy >= 1) {
      pet.delicacy--;
      pet.satiety = pet.satiety + 3;
      if (pet.satiety > 100) {
        pet.satiety = 100;
      }
      if (!pet.comsndSitStudied) {
        pet.comsndSitStudied = true;
        pet.comsndSitProgress = 30;
        setImgPet(pet.img_pet[1]);
        setTimeout(() => {
          setImgPet(pet.img_pet[0]);
        }, 2500);
      } else {
        getObedience(100);
        console.log("resultObedience", resultObedience);
        if (pet.comsndSitProgress >= resultObedience) {
          if (pet.comsndSitProgress >= 100) {
            pet.comsndSitProgress = 100;
          } else {
            pet.comsndSitProgress = pet.comsndSitProgress + 10;
          }

          setImgPet(pet.img_pet[1]);
          setTimeout(() => {
            setImgPet(pet.img_pet[0]);
          }, 2500);
        }
      }
    } else {
      return;
    }

    setMyPets([...myPets], pet.comsndSitStudied);
  };
  // Команда "Лежать"
  const comandLie = () => {
    console.log(pet.comsndLietStudied);
    if (pet.delicacy >= 1) {
      pet.delicacy--;
      pet.satiety = pet.satiety + 3;
      if (pet.satiety > 100) {
        pet.satiety = 100;
      }
      if (!pet.comsndLietStudied) {
        pet.comsndLietStudied = true;
        pet.comsndLietProgress = 30;
        setImgPet(pet.img_pet[2]);
        setTimeout(() => {
          setImgPet(pet.img_pet[0]);
        }, 2500);
      } else {
        getObedience(100);
        console.log("resultObedience", resultObedience);
        if (pet.comsndLietProgress >= resultObedience) {
          if (pet.comsndLietProgress >= 100) {
            pet.comsndLietProgress = 100;
          } else {
            pet.comsndLietProgress = pet.comsndLietProgress + 10;
          }

          setImgPet(pet.img_pet[2]);
          setTimeout(() => {
            setImgPet(pet.img_pet[0]);
          }, 2500);
        }
      }
    } else {
      return;
    }
    setMyPets([...myPets], pet.comsndLietStudied);
  };

  // Съесть вкусняшку
  const feedDelicacy = () => {
    if (pet.delicacy > 0) {
      pet.delicacy--;
      pet.satiety = pet.satiety + 3;
      if (pet.satiety > 100) {
        pet.satiety = 100;
      }
    }
    setMyPets([...myPets], pet.delicacy);
  };

  return (
    <>
      <div className="statPanel">
        <span className="statPanel-title">
          Питомец: <span className="statPanel-name">{pet.name}</span>
          <span> {pet.type}</span>
        </span>
        <div className="containerStat">
          {/* <ItesstatInfo
            text="Усталость"
            stat={Math.round(pet.hp)}
            style={{
              textAlign: "center",
              color: "azure",
              width: pet.hp + "px",
              background: "#67a52e",
              borderRadius: "4px",
            }}
          />
          <ItesstatInfo
            text="Сытость"
            stat={pet.satiety}
            style={{
              textAlign: "center",
              color: "azure",
              width: pet.satiety + "px",
              background: "#67a52e",
              borderRadius: "4px",
            }}
          />
          <ItesstatInfo
            text="Туалет"
            stat={Math.round(pet.toilet)}
            style={{
              textAlign: "center",
              color: "azure",
              width: pet.toilet + "px",
              background: "#67a52e",
              borderRadius: "4px",
            }}
          />
          <ItesstatInfo
            text="Настроение"
            stat={Math.round(pet.mood)}
            style={{
              textAlign: "center",
              color: "azure",
              width: pet.mood + "px",
              background: "#67a52e",
              borderRadius: "4px",
            }}
          /> */}
          <div className="statPanel-stat">
            Усталость{" "}
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
                  width: pet.energy + "px",
                  background: "#67a52e",
                  borderRadius: "4px",
                }}
              >
                {Math.round(pet.energy)}
              </div>
            </div>
          </div>
          <div className="statPanel-stat">
            Сытость{" "}
            <div style={{ width: "100px", background: "#958e8e" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "azure",
                  width: pet.satiety + "px",
                  background: "#67a52e",
                  borderRadius: "4px",
                }}
              >
                {Math.round(pet.satiety)}
              </div>
            </div>
          </div>
          <div className="statPanel-stat">
            Туалет{" "}
            <div style={{ width: "100px", background: "#958e8e" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "azure",
                  width: pet.toilet + "px",
                  background: "#67a52e",
                  borderRadius: "4px",
                }}
              >
                {Math.round(pet.toilet)}
              </div>
            </div>
          </div>
          <div className="statPanel-stat">
            Настроение{" "}
            <div style={{ width: "100px", background: "#958e8e" }}>
              <div
                style={{
                  textAlign: "center",
                  color: "azure",
                  width: pet.mood + "px",
                  background: "#67a52e",
                  borderRadius: "4px",
                }}
              >
                {Math.round(pet.mood)}
              </div>
            </div>
          </div>
        </div>
        <div className="money-container">
          <img className="money-container-img" src="./img/icon/money.png" />
          <span>{pet.money}</span>
        </div>
        <Link to="/">Выход</Link>
      </div>
      <div className="conteiner-comands">
        <h3 className="comand-title" onClick={showComandF}>
          Команды
        </h3>
        {comandShow ? (
          <>
            <ul className="container-comand-dinamic">
              <li className="comand" onClick={comandSit}>
                "Сидеть!"
              </li>
              {pet.comsndSitStudied ? (
                <li className="comand-progress">
                  Изучено {pet.comsndSitProgress}/100
                </li>
              ) : (
                <></>
              )}
              <li className="comand" onClick={comandLie}>
                "Лежать!"
              </li>
              {pet.comsndLietStudied ? (
                <li className="comand-progress">
                  Изучено {pet.comsndLietProgress}/100
                </li>
              ) : (
                <></>
              )}
              <li className="container-delicacy">
                <img
                  className="delicacy-img"
                  src="./img/icon/delicacy.png"
                  onClick={feedDelicacy}
                />
                <span className="delicacy-stat">{pet.delicacy} </span>
                <span className="delicacy-buy" onClick={buyDelicacy}>
                  {" "}
                  Купить
                </span>
              </li>
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default HeaderStat;
