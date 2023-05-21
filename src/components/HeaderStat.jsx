import React, { memo, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ItesstatInfo from "./ItesstatInfo";

import imgMoney from "../img/icon/money.png";
import imgDelicacy from "../img/icon/delicacy.png";
import market from "../img/icon/market.png";
import Market from "./Market";
import ModalLvlUp from "./ModalLvlUp";

const HeaderStat = memo(
  ({
    pet,
    myPets,
    setMyPets,
    setImgPet,
    page,
    imgNav,
    setBackgroundStyle,
    backgroundStyle,
  }) => {
    // магазин
    const [visibleMarket, setVisibleMarket] = useState(false);
    const showMarket = () => {
      setVisibleMarket(true);
    };

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
      }, 1500);
      return () => clearInterval(intervalUpdateLocalStorageHunger);
    }, [pet]);
    // Настроение
    useEffect(() => {
      intervalUpdateLocalStorageMood = null;
      intervalUpdateLocalStorageMood = setInterval(() => {
        consumptionMood();
      }, 2100);
      return () => clearInterval(intervalUpdateLocalStorageMood);
    }, [pet]);
    // Туалет
    useEffect(() => {
      intervalUpdateLocalStorageToilet = null;
      intervalUpdateLocalStorageToilet = setInterval(() => {
        consumptionToilet();
      }, 1900);
      return () => clearInterval(intervalUpdateLocalStorageToilet);
    }, [pet]);
    // Восстановление усталости
    useEffect(() => {
      intervalUpdateLocalStorageEnergy = null;
      intervalUpdateLocalStorageEnergy = setInterval(() => {
        recoveryEnergy();
      }, 15000);
      return () => clearInterval(intervalUpdateLocalStorageEnergy);
    }, [pet]);
    // Голод
    const consumptionFood = () => {
      if (pet.satiety > 0) {
        const newTime = new Date();
        const oldTime = new Date(pet.end_food);
        const diff = (newTime.getTime() - oldTime.getTime()) / 1500;
        pet.satiety = pet.satiety - diff * 1;
        if (pet.satiety <= 0) {
          pet.satiety = 0;
        }
        pet.end_food = newTime;
      }
      // Расчёт голода конец
      setMyPets([...myPets], pet.end_food, pet.satiety);
    };
    // Настроение
    const consumptionMood = () => {
      if (pet.mood > 0) {
        const newTime = new Date();
        const oldTime = new Date(pet.time_game);
        const diff = (newTime.getTime() - oldTime.getTime()) / 2100;
        pet.mood = pet.mood - diff * 1;
        if (pet.mood <= 0) {
          pet.mood = 0;
        }
        pet.time_game = newTime;
      }
      setMyPets([...myPets], pet.time_game, pet.mood);
    };
    // Туалет
    const consumptionToilet = () => {
      const newTime = new Date();
      if (pet.toilet > 0 && !pet.shit) {
        // newTime = new Date();
        const oldTime = new Date(pet.end_toilet);
        const diff = (newTime.getTime() - oldTime.getTime()) / 1900;
        pet.toilet = pet.toilet - diff * 1;
        if (pet.toilet <= 0) {
          pet.toilet = 0;
        }
        pet.end_toilet = newTime;
      } else if (!pet.shit) {
        pet.shit = true;
        pet.toilet = 100;
      } else {
        return;
      }
      setMyPets([...myPets], pet.end_toilet, pet.shit);
    };
    // Восстановленние усталости
    const recoveryEnergy = () => {
      const newTime = new Date();
      const oldTime = new Date(pet.end_energy);
      const diff = (newTime.getTime() - oldTime.getTime()) / 15000;
      pet.energy = pet.energy + diff * 1;
      if (pet.energy >= 100) {
        pet.energy = 100;
      }
      pet.end_energy = newTime;
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
    // Команда 1
    const comandSit = () => {
      console.log(pet.comsndOneStudied);
      if (pet.delicacy >= 1 && pet.energy >= 5) {
        pet.delicacy--;
        pet.satiety = pet.satiety + 3;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
        if (!pet.comsndOneStudied) {
          pet.comsndOneStudied = true;
          pet.comsndOneProgress = 30;
          levelUpFunction();
          setImgPet(pet.img_pet[1]);
          setTimeout(() => {
            setImgPet(pet.img_pet[0]);
          }, 2500);
        } else {
          getObedience(100);
          console.log("resultObedience", resultObedience);
          if (pet.comsndOneProgress >= resultObedience) {
            if (pet.comsndOneProgress >= 100) {
              pet.comsndOneProgress = 100;
            } else {
              pet.comsndOneProgress = pet.comsndOneProgress + 10;
              levelUpFunction();
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

      setMyPets([...myPets], pet.comsndOneStudied);
    };
    // Команда 2
    const comandLie = () => {
      console.log(pet.comsndTwoStudied);
      if (pet.delicacy >= 1 && pet.energy >= 5) {
        pet.delicacy--;
        pet.satiety = pet.satiety + 3;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
        if (!pet.comsndTwoStudied) {
          pet.comsndTwoStudied = true;
          pet.comsndTwoProgress = 30;
          levelUpFunction();
          setImgPet(pet.img_pet[2]);
          setTimeout(() => {
            setImgPet(pet.img_pet[0]);
          }, 2500);
        } else {
          getObedience(100);
          console.log("resultObedience", resultObedience);
          if (pet.comsndTwoProgress >= resultObedience) {
            pet.energy = pet.energy - 5;
            if (pet.comsndTwoProgress >= 100) {
              pet.comsndTwoProgress = 100;
            } else {
              pet.comsndTwoProgress = pet.comsndTwoProgress + 10;
              levelUpFunction();
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
      setMyPets([...myPets], pet.comsndTwoStudied, pet.energy);
    };

    // Съесть вкусняшку
    const feedDelicacy = () => {
      if (pet.delicacy > 0) {
        pet.delicacy--;
        pet.satiety = pet.satiety + 3;
        pet.energy = pet.energy + 3;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
      }
      setMyPets([...myPets], pet.delicacy, pet.energy, pet.satiety);
    };

    // Повышение уровняпитомца
    const [blockLevelUp, setBlockLevelUp] = useState(false);
    const [newBonusFlag, setNewBonusFlag] = useState(false);
    const [newBonus, setNewBonus] = useState("");
    const [addMoney, setAddMoney] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const levelUp = () => {
      if (pet.progressLevel >= 100) {
        pet.level++;
        pet.progressLevel = pet.progressLevel - 100;
      }
    };
    const levelUpFunction = () => {
      if (pet.level === 1) {
        pet.progressLevel = pet.progressLevel + 34;
        levelUp();
        if (pet.level === 2) {
          setNewBonus("Монеты");
          setQuantity(5);
          setAddMoney(5);
          setBlockLevelUp(true);
        }
      } else if (pet.level === 2) {
        pet.progressLevel = pet.progressLevel + 18;
        levelUp();
        if (pet.level === 3) {
          setNewBonus("Монеты");
          setQuantity(7);
          setAddMoney(7);
          setBlockLevelUp(true);
        }
      } else if (pet.level === 3) {
        pet.progressLevel = pet.progressLevel + 13;
        levelUp();
        if (pet.level === 4) {
          setNewBonus("Монеты");
          setQuantity(10);
          setAddMoney(10);
          setBlockLevelUp(true);
        }
      } else if (pet.level === 4) {
        pet.progressLevel = pet.progressLevel + 10;
        levelUp();
      } else if (pet.level === 5) {
        pet.progressLevel = pet.progressLevel + 5;
        levelUp();
      } else if (pet.level > 5) {
        pet.progressLevel = pet.progressLevel + 3;
        levelUp();
      }
      setMyPets([...myPets], pet.level, pet.progressLevel);
    };
    // Модальное окно бонуса за новый уровень

    const getBonus = () => {
      setBlockLevelUp(false);
      setNewBonusFlag(true);
    };

    useEffect(() => {
      setNewBonus(() => newBonus);
      setAddMoney(() => addMoney);
      setQuantity(() => quantity);
      pet.money = pet.money + addMoney;
      setMyPets([...myPets], pet.money);
      setNewBonusFlag(false);
      console.log(newBonusFlag);
      setNewBonus(() => "");
      setQuantity(() => 0);
      setAddMoney(() => 0);
    }, [newBonusFlag]);

    return (
      <>
        <div className="statPanel">
          <div className="containerStat">
            <div className="statPanel-stat">
              Энергия{" "}
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
          {/* Профиль справа */}
          <div className="statPanel-name-money">
            <div className="statPanel-title">
              <div className="statPanel-name">{pet.name}</div>
              <div className="statPanel-name">
                Ур. <span className="statPanel-lvl">{pet.level}</span>
              </div>
              <div className="progress-exp">
                <div
                  style={{
                    textAlign: "center",
                    color: "azure",
                    width: pet.progressLevel + "px",
                    background: "blueviolet",
                    borderRadius: "4px",
                    height: "24px",
                  }}
                ></div>
                <span className="statPanel-exp-progress-title">Опыт</span>
              </div>
              <div className="statPanel-type-pet"> {pet.type}</div>
            </div>

            <div className="money-container">
              <img className="money-container-img" src={imgMoney} />
              <span>{pet.money}</span>
            </div>
          </div>
        </div>
        <div className="conteiner-comands">
          <h3 className="comand-title" onClick={showComandF}>
            Команды
          </h3>
          {comandShow ? (
            <>
              <ul className="container-comand-dinamic">
                <li className="comand" onClick={comandSit}>
                  {pet.comsndOneText}
                </li>
                {pet.comsndOneStudied ? (
                  <li className="comand-progress">
                    Изучено {pet.comsndOneProgress}/100
                  </li>
                ) : (
                  <></>
                )}
                <li className="comand" onClick={comandLie}>
                  {pet.comsndTwoText}
                </li>
                {pet.comsndTwoStudied ? (
                  <li className="comand-progress">
                    Изучено {pet.comsndTwoProgress}/100
                  </li>
                ) : (
                  <></>
                )}
                <li className="container-delicacy">
                  <img
                    className="delicacy-img"
                    src={imgDelicacy}
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
        <nav className="nav-game">
          <Link className="link-to-street" to={`/${page}/${pet.id}`}>
            <img src={imgNav} alt="" />
            Гулять
          </Link>
          <div className="market-container-btn" onClick={showMarket}>
            <img src={market} />
            Магазин
          </div>
          {!comandShow ? (
            <Link className="exit" to="/">
              Выход
            </Link>
          ) : (
            <></>
          )}
        </nav>
        {visibleMarket ? (
          <Market
            pet={pet}
            myPets={myPets}
            setMyPets={setMyPets}
            setVisibleMarket={setVisibleMarket}
            setBackgroundStyle={setBackgroundStyle}
            backgroundStyle={backgroundStyle}
          />
        ) : (
          <></>
        )}
        {blockLevelUp ? (
          <ModalLvlUp
            blockLevelUp={blockLevelUp}
            setBlockLevelUp={setBlockLevelUp}
            getbonus={getBonus}
            name_pet={pet.name}
            level_pet={pet.level}
            bonus={newBonus}
            quantity={quantity}
          />
        ) : (
          <></>
        )}
      </>
    );
  }
);

export default HeaderStat;
