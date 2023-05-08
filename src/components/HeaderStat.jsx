import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const HeaderStat = ({ pet, myPets, setMyPets, setImgPet }) => {
  // Команды
  const [comandShow, setComandShow] = useState(false);
  // Потребности
  let intervalUpdateLocalStorageHunger;
  let intervalUpdateLocalStorageMood;

  // Голод
  useEffect(() => {
    intervalUpdateLocalStorageHunger = null;
    intervalUpdateLocalStorageHunger = setInterval(() => {
      consumptionFood();
      // Расчёт здоровья
      pet.hp = Math.round((pet.satiety + pet.mood) / 2);
    }, 15000);
    return () => clearInterval(intervalUpdateLocalStorageHunger);
  }, [pet]);
  // Настроение
  useEffect(() => {
    intervalUpdateLocalStorageMood = null;
    intervalUpdateLocalStorageMood = setInterval(() => {
      consumptionMood();
    }, 21000);
    return () => clearInterval(intervalUpdateLocalStorageMood);
  }, [pet]);

  // Расход потребностей
  const consumptionFood = () => {
    const newTime = new Date();
    const oldTime = new Date(pet.end_food);
    // Расчёт голода начало
    const diff = Math.round((newTime.getTime() - oldTime.getTime()) / 15000);
    pet.satiety = Math.round(pet.satiety - diff * 1);
    pet.end_food = newTime;
    // Расчёт голода конец
    setMyPets([...myPets], pet.end_food);
  };
  const consumptionMood = () => {
    const newTime = new Date();
    const oldTime = new Date(pet.time_game);
    const diff = Math.round((newTime.getTime() - oldTime.getTime()) / 21000);
    pet.mood = Math.round(pet.mood - diff * 1);
    pet.time_game = newTime;
    setMyPets([...myPets], pet.time_game);
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
            pet.comsndSitProgress = 100
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
            pet.comsndLietProgress = 100
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
          <p className="statPanel-stat">Здоровье <div style={{
            width: '100px', background: '#958e8e',
          }}><div style={{textAlign: 'center', color: "azure", width: pet.hp + 'px', background: 'rgb(167 37 37)', borderRadius: '4px'}}>{pet.hp}</div></div></p>
          <p className="statPanel-stat">Сытость <div style={{width: '100px', background: '#958e8e',}}><div style={{textAlign: 'center', color: "azure", width: pet.satiety + 'px', background: '#67a52e', borderRadius: '4px'
          }}>{pet.satiety}</div></div></p>
          <p className="statPanel-stat">Настроение <div style={{width: '100px', background: '#958e8e',}}><div style={{textAlign: 'center', color: "azure", width: pet.mood + 'px', background: '#67a52e', borderRadius: '4px'
          }}>{pet.mood}</div></div></p>
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
