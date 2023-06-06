import React, { memo, useEffect, useMemo, useState, forwardRef } from "react";
import { Link } from "react-router-dom";
import ItesstatInfo from "./ItesstatInfo";
import ModalLog from "../components/ModalLog";

import imgMoney from "../img/icon/money.png";
import imgDelicacy from "../img/icon/delicacy.png";
import market from "../img/icon/market.png";
import Market from "./Market";
import ModalLvlUp from "./ModalLvlUp";
import newsImg from "../img/icon/newspaper.png";
import News from "./News";
import EffectStat from "./EffectStat";

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
    backgroundStyleStreet,
    setbackgroundStyleStreet,
    streetBtn,
    visibleModal,
    setVisibleModal,
    coordsPet,
    message,
    setMessage,
    setCoordsPet,
    coords,
    refCoords,
  }) => {
    // const ref = useRef();
    // магазин
    const [visibleMarket, setVisibleMarket] = useState(false);
    const showMarket = () => {
      setVisibleMarket(true);
    };

    // Новости
    const [visibleNews, setVisibleNews] = useState(false);
    const showNews = () => {
      setVisibleNews(true);
    };

    // Цветовая индикация стат бара

    // Команды
    const [comandShow, setComandShow] = useState(false);
    // Потребности
    let intervalUpdateLocalStorageHunger;
    let intervalUpdateLocalStorageMood;
    let intervalUpdateLocalStorageToilet;
    let intervalUpdateLocalStorageEnergy;
    //

    // Функция погоды
    const [bafMeteo, setBafMeteo] = useState(pet.currentMeteo);
    let intervalUpdateMeteo;
    useEffect(() => {
      intervalUpdateMeteo = null;
      intervalUpdateMeteo = setInterval(() => {
        meteoFuncion();
        console.log("currentMeteo", pet.currentMeteo);
      }, 10000);
      return () => clearInterval(intervalUpdateMeteo);
    }, [pet]);

    // Функция погоды
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
    // Команда сидеть
    const comandSit = () => {
      if (pet.delicacy >= 1 && pet.energy >= 5) {
        pet.delicacy--;
        pet.satiety = pet.satiety + 3;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
        if (!pet.comands[0].studied) {
          pet.comands[0].studied = true;
          pet.comands[0].progress = 30;
          levelUpFunction();
          setImgPet(pet.img_pet[2]);
          setTimeout(() => {
            setImgPet(pet.img_pet[1]);
          }, 2500);
        } else {
          getObedience(100);
          // console.log("resultObedience", resultObedience);
          if (pet.comands[0].progress >= resultObedience) {
            if (pet.comands[0].progress >= 100) {
              pet.comands[0].progress = 100;
            } else {
              pet.comands[0].progress = pet.comands[0].progress + 10;
              levelUpFunction();
            }

            setImgPet(pet.img_pet[2]);
            setTimeout(() => {
              setImgPet(pet.img_pet[1]);
            }, 2500);
          }
        }
        pet.energy = pet.energy - 5;
      } else if (pet.energy < 5) {
        setMessage((m) => (m = "У меня нет сил играть"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      } else if (pet.delicacy === 0) {
        setMessage((m) => (m = "А дашь вкусняшку?"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }

      // else {
      //   return;
      // }

      setMyPets([...myPets], pet.comands[0].studied);
    };
    // Команда лежать
    const comandLie = () => {
      if (pet.delicacy >= 1 && pet.energy >= 5) {
        pet.delicacy--;
        pet.satiety = pet.satiety + 3;
        if (pet.satiety > 100) {
          pet.satiety = 100;
        }
        if (!pet.comands[1].studied) {
          pet.comands[1].studied = true;
          pet.comands[1].progress = 30;
          levelUpFunction();
          setImgPet(pet.img_pet[3]);
          setTimeout(() => {
            setImgPet(pet.img_pet[1]);
          }, 2500);
        } else {
          getObedience(100);
          // console.log("resultObedience", resultObedience);
          if (pet.comands[1].progress >= resultObedience) {
            pet.energy = pet.energy - 5;
            if (pet.comands[1].progress >= 100) {
              pet.comands[1].progress = 100;
            } else {
              pet.comands[1].progress = pet.comands[1].progress + 10;
              levelUpFunction();
            }

            setImgPet(pet.img_pet[3]);
            setTimeout(() => {
              setImgPet(pet.img_pet[1]);
            }, 2500);
          }
        }
        pet.energy = pet.energy - 5;
      } else if (pet.energy < 5) {
        setMessage((m) => (m = "У меня нет сил играть"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      } else if (pet.delicacy === 0) {
        setMessage((m) => (m = "А дашь вкусняшку?"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }
      setMyPets([...myPets], pet.comands[1].studied, pet.energy);
    };
        // Команда "Дай лапу"
        const comandPaw = () => {
          if (pet.delicacy >= 1 && pet.energy >= 5) {
            pet.delicacy--;
            pet.satiety = pet.satiety + 3;
            if (pet.satiety > 100) {
              pet.satiety = 100;
            }
            if (!pet.comands[2].studied) {
              pet.comands[2].studied = true;
              pet.comands[2].progress = 30;
              levelUpFunction();
              setImgPet(pet.img_pet[4]);
              setTimeout(() => {
                setImgPet(pet.img_pet[1]);
              }, 2500);
            } else {
              getObedience(100);
              // console.log("resultObedience", resultObedience);
              if (pet.comands[2].progress >= resultObedience) {
                pet.energy = pet.energy - 5;
                if (pet.comands[2].progress >= 100) {
                  pet.comands[2].progress = 100;
                } else {
                  pet.comands[2].progress = pet.comands[2].progress + 10;
                  levelUpFunction();
                }
    
                setImgPet(pet.img_pet[4]);
                setTimeout(() => {
                  setImgPet(pet.img_pet[1]);
                }, 2500);
              }
            }
            pet.energy = pet.energy - 5;
          } else if (pet.energy < 5) {
            setMessage((m) => (m = "У меня нет сил играть"));
            coords = refCoords.current.getBoundingClientRect();
            setCoordsPet(coords);
            setVisibleModal(true);
            setTimeout(() => {
              setVisibleModal(false);
            }, 3000);
          } else if (pet.delicacy === 0) {
            setMessage((m) => (m = "А дашь вкусняшку?"));
            coords = refCoords.current.getBoundingClientRect();
            setCoordsPet(coords);
            setVisibleModal(true);
            setTimeout(() => {
              setVisibleModal(false);
            }, 3000);
          }
          setMyPets([...myPets], pet.comands[2].studied, pet.energy);
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

    // Повышение уровня питомца
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
      // console.log(newBonusFlag);
      setNewBonus(() => "");
      setQuantity(() => 0);
      setAddMoney(() => 0);
    }, [newBonusFlag]);

    // Погода
    let upDateMeteo;
    // Функция расчёта погоды
    let randomMeteo;
    const getRandomMeteo = () => {
      return (randomMeteo = Math.floor(Math.random() * 100));
    };
    //
    const pushMeteo = () => {
      getRandomMeteo();
      if (randomMeteo < 20) {
        //   // Получить рандомно температуру
        const getRandomTemperature = () => {
          return (pet.meteoCollection[1].temperature =
            Math.floor(
              Math.random() *
                (pet.meteoCollection[1].max_temperature -
                  pet.meteoCollection[1].min_temperature +
                  1)
            ) + pet.meteoCollection[1].min_temperature);
        };
        getRandomTemperature();
        pet.currentMeteo.push(pet.meteoCollection[1]);
      } else if (randomMeteo > 20 && randomMeteo < 80) {
        // Получить рандомно температуру
        const getRandomTemperature = () => {
          return (pet.meteoCollection[0].temperature =
            Math.floor(
              Math.random() *
                (pet.meteoCollection[0].max_temperature -
                  pet.meteoCollection[0].min_temperature +
                  1)
            ) + pet.meteoCollection[0].min_temperature);
        };
        getRandomTemperature();
        pet.currentMeteo.push(pet.meteoCollection[0]);
      } else if (randomMeteo > 80) {
        // Получить рандомно температуру
        const getRandomTemperature = () => {
          return (pet.meteoCollection[2].temperature =
            Math.floor(
              Math.random() *
                (pet.meteoCollection[2].max_temperature -
                  pet.meteoCollection[2].min_temperature +
                  1)
            ) + pet.meteoCollection[2].min_temperature);
        };
        getRandomTemperature();
        pet.currentMeteo.push(pet.meteoCollection[2]);
      }
    };

    const meteoFuncion = () => {
      const newTime = new Date();
      const oldTime = new Date(pet.meteoVar);
      const diff = (newTime.getTime() - oldTime.getTime()) / 10000;
      // const upDateMeteo = Math.floor(diff / 50);
      upDateMeteo = Math.floor(diff * 1);
      // console.log("upDateMeteo", upDateMeteo);
      if (upDateMeteo > 3) {
        upDateMeteo = 3;
      }

      for (let i = 0; i < upDateMeteo; i++) {
        // console.log("pet.currentMeteo", pet.currentMeteo);
        pet.currentMeteo.shift();
        // Рандомно кладёт погоду в массив
        getRandomMeteo();
        pushMeteo();
      }
      pet.meteoVar = newTime;
      // console.log("pet.currentMeteo.length", pet.currentMeteo.length);
      if (pet.currentMeteo.length < 3) {
        pushMeteo();
      }
      setbackgroundStyleStreet(pet.currentMeteo[0].bg);
      setBafMeteo([...bafMeteo])
      // console.log("bafMeteo", bafMeteo);
      setMyPets([...myPets], pet.currentMeteo);
    };
    // Погода
    useEffect(() => {
      setbackgroundStyleStreet(backgroundStyleStreet);
    }, [backgroundStyleStreet]);

    //
    return (
      <>
        <div className="statPanel">
          <div className="containerStat">
            <ItesstatInfo stat={pet.hp} text="Здоровье" />
            <ItesstatInfo stat={pet.energy} text="Энергия" />
            <ItesstatInfo stat={pet.satiety} text="Сытость" />
            <ItesstatInfo stat={pet.mood} text="Настроение" />
            <ItesstatInfo stat={pet.toilet} text="Туалет" />
            {/* <div className="statPanel-stat">
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
            </div> */}
            {/* <div className="statPanel-stat">
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
            </div> */}
            {/* <div className="statPanel-stat">
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
            </div> */}
            {/* <div className="statPanel-stat">
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
            </div> */}
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
              <EffectStat
                pet={pet}
                setBafMeteo={setBafMeteo}
                bafMeteo={bafMeteo}
              />
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
                {/* Команда сидеть */}
                <li className="comand" onClick={comandSit}>
                  {pet.comands[0].name}
                </li>
                {pet.comands[0].studied ? (
                  <li className="comand-progress">
                    Изучено {pet.comands[0].progress}/100
                  </li>
                ) : (
                  <></>
                )}
                {/* Команда лежать */}
                <li className="comand" onClick={comandLie}>
                  {pet.comands[1].name}
                </li>
                {pet.comands[1].studied ? (
                  <li className="comand-progress">
                    Изучено {pet.comands[1].progress}/100
                  </li>
                ) : (
                  <></>
                )}
                {/* Команда дай лапу */}
                <li className="comand" onClick={comandPaw}>
                  {pet.comands[2].name}
                </li>
                {pet.comands[2].studied ? (
                  <li className="comand-progress">
                    Изучено {pet.comands[2].progress}/100
                  </li>
                ) : (
                  <></>
                )}
                <li className="container-delicacy">
                  <img
                    className="delicacy-img"
                    src={imgDelicacy}
                    // onClick={feedDelicacy}
                  />
                  {/* <span className="delicacy-stat">{pet.delicacy} </span> */}
                  {pet.delicacy === 0 ? (
                    <span> Купите в магазине </span>
                  ) : (
                    <span className="delicacy-stat">{pet.delicacy} </span>
                  )}
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
        <nav className="nav-game">
          {streetBtn ? (
            <Link className="link-to-street" to={`/${page}/${pet.id}`}>
              <img src={imgNav} alt="" />
              Гулять
            </Link>
          ) : (
            <></>
          )}

          <div className="market-container-btn" onClick={showMarket}>
            <img src={market} />
            Магазин
          </div>
          <div className="market-container-btn" onClick={showNews}>
            <img src={newsImg} />
            Новости
          </div>
          {!comandShow ? (
            <Link className="exit" to="/">
              Выход
            </Link>
          ) : (
            <></>
          )}
        </nav>
        {/* Мгазин */}
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
        {/* Новости */}
        {visibleNews ? (
          <News pet={pet} setVisibleNews={setVisibleNews} />
        ) : (
          <></>
        )}
        {/* Окно бонуса повышения уровня */}
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
        <ModalLog
          visibleModal={visibleModal}
          setVisibleModal={setVisibleModal}
          coordsPet={coordsPet}
        >
          {visibleModal ? <p>{message}</p> : <></>}
        </ModalLog>
      </>
    );
  }
);

export default HeaderStat;
