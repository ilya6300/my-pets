import React, { memo, useEffect, useMemo, useState } from "react";

// Фоны
import imgBackgroundHomeDog from "../img/background/locationHome.png";
import imgBGHomeSpace from "../img/background/kosmicheskii-korabl.png";
import imgBGLitleDragon from "../img/background/bg_dragon.jpg";
// Игрушки
import imgCarOne from "../img/object/toy/car.png";
import imgCarTwo from "../img/object/toy/car2.png";
import imgHamsterOne from "../img/object/toy/hamster.png";
import imgHamsterTwo from "../img/object/toy/hamster2.png";
import imgPlanetOne from "../img/object/toy/planet1.png";
import imgPlanetTwo from "../img/object/toy/space-planet.png";
import imgSword from "../img/object/toy/sword.png";
// Расходникик
import imgDelicacy from "../img/icon/delicacy.png";
import imgEnergy from "../img/icon/energy_icon.png";

//
import ListBGMarket from "./ListBGMarket";
import ListToyMarket from "./ListToyMarket";
import ListConsumablesMark from "./ListConsumablesMark";

const Market = memo(
  ({
    pet,
    myPets,
    setMyPets,
    setVisibleMarket,
    setBackgroundStyle,
    backgroundStyle,
  }) => {
    // Переменные меню
    const [skinAll, setSkinAll] = useState(false); // Обои и скины
    const [consumablesFlag, setConsumablesFlag] = useState(true); // Расходники
    const [superM, setSuperM] = useState(false);
    const [viewerContent, setViewerContent] = useState(null);
    const [targetSale, setTargetSale] = useState(null);
    let classSkinBtn = ["btn-market"];
    let classConsumablesBtn = ["btn-market"];

    if (skinAll) {
      classSkinBtn = ["btn-market btn-market-active"];
      classConsumablesBtn = ["btn-market"];
    } else if (consumablesFlag) {
      classConsumablesBtn = ["btn-market btn-market-active"];
      classSkinBtn = ["btn-market"];
    }

    const [bg, setBg] = useState([
      {
        id: 1,
        title: "Дом",
        img: imgBackgroundHomeDog,
        price: 2,
        type: "bg",
      },
      {
        id: 2,
        title: "Космос",
        img: imgBGHomeSpace,
        price: 3,
        type: "bg",
      },
      {
        id: 3,
        title: "Пещера дракона",
        img: imgBGLitleDragon,
        price: 4,
        type: "bg",
      },
      {
        id: 4,
        title: "Дом",
        img: imgBackgroundHomeDog,
        price: 2,
        type: "bg",
      },
      {
        id: 5,
        title: "Космос",
        img: imgBGHomeSpace,
        price: 3,
        type: "bg",
      },
      {
        id: 6,
        title: "Пещера дракона",
        img: imgBGLitleDragon,
        price: 4,
        type: "bg",
      },
    ]);
    const [toy, setToy] = useState([
      {
        id: 1,
        title: "Машинка",
        img: imgCarOne,
        price: 2,
        type: "toy",
      },
      {
        id: 2,
        title: "Машинка",
        img: imgCarTwo,
        price: 2,
        type: "toy",
      },
      {
        id: 3,
        title: "Хомяк",
        img: imgHamsterOne,
        price: 2,
        type: "toy",
      },
      {
        id: 4,
        title: "Хомяк",
        img: imgHamsterTwo,
        price: 2,
        type: "toy",
      },
      {
        id: 5,
        title: "Планета",
        img: imgPlanetOne,
        price: 3,
        type: "toy",
      },
      {
        id: 6,
        title: "Планета",
        img: imgPlanetTwo,
        price: 3,
        type: "toy",
      },
      {
        id: 7,
        title: "Меч",
        img: imgSword,
        price: 2,
        type: "toy",
      },
    ]);
    // Расходники
    const [consumables, setConsumables] = useState([
      {
        id: 1,
        title: "Вкусняшка",
        img: imgDelicacy,
        text: "Купить лакомство для тренировок 1 шт.",
        price: 2,
        type: "consumables",
        buy() {
          if (pet.money >= 2) {
            pet.money = pet.money - 2;
            pet.delicacy++;
            setMyPets([...myPets], pet.delicacy);
          }
          console.log("Я купил лакомство");
        },
      },
      {
        id: 2,
        title: "Энергетик",
        img: imgEnergy,
        text: "Купить 50 энергии",
        price: 5,
        type: "consumables",
        buy() {
          if (pet.money >= 5) {
            pet.money = pet.money - 5;
            pet.energy = pet.energy + 50;
            if (pet.energy > 100) {
              pet.energy = 100;
            }
            setMyPets([...myPets], pet.energy);
          }
          console.log("Я купил энергию");
        },
      },
    ]);

    const hiddenMarket = () => {
      setVisibleMarket(false);
    };

    // маркет навигация
    const showSkin = () => {
      setViewerContent(null);
      setSkinAll((f) => (f = true));
      setConsumablesFlag((f) => (f = false));
      setSuperM((f) => (f = false));
    };
    const showConsumables = () => {
      setViewerContent(null);
      setSkinAll((f) => (f = false));
      setConsumablesFlag((f) => (f = true));
      setSuperM((f) => (f = false));
    };
    // Показать расходник
    const thisConsumables = (bgmarket) => {
      setTargetSale(consumables.find((c) => c.id === bgmarket.id));
    };
    // Купить расходник
    const buyConsumables = () => {
      targetSale.buy();
    };

    // Выбор карты фона в магазине
    useEffect(() => {
      setTargetSale(targetSale);
      console.log(targetSale);
      if (targetSale) {
        setViewerContent(targetSale.img);
      } else return;
    }, [targetSale]);

    const thisBG = (bgmarket) => {
      setTargetSale(bg.find((b) => b.id === bgmarket.id));
    };
    const thisToy = (bgmarket) => {
      setTargetSale(toy.find((t) => t.id === bgmarket.id));
    };
    // Купить новый фон
    const saleBG = () => {
      if (pet.money >= targetSale.price) {
        pet.bgHome.unshift(viewerContent);
        setBackgroundStyle(pet.bgHome[0]);
        pet.money = pet.money - targetSale.price;
        setVisibleMarket(false);
        setMyPets([...myPets], pet.bgHome, pet.money);
      }
      return;
    };
    // Купить скин игрушке
    const saleToyOne = () => {
      if (pet.money >= targetSale.price) {
        pet.toyOneObj = viewerContent;
        // setBackgroundStyle(pet.bgHome[0]);
        pet.money = pet.money - targetSale.price;
        setVisibleMarket(false);
        setMyPets([...myPets], pet.toyOneObj, pet.money);
      }
      return;
    };
    //
    const saleToyTwo = () => {
      if (pet.money >= targetSale.price) {
        pet.toyTwoObj = viewerContent;
        // setBackgroundStyle(pet.bgHome[0]);
        pet.money = pet.money - targetSale.price;
        setVisibleMarket(false);
        setMyPets([...myPets], pet.toyTwoObj, pet.money);
      }
      return;
    };

    // useEffect(() => {
    //   setBackgroundStyle(backgroundStyle);
    // }, [backgroundStyle]);

    // useEffect(() => {
    //   setBackgroundStyle(backgroundStyle);
    // }, [backgroundStyle]);

    // Супер чит super

    const showSuper = () => {
      setViewerContent(null);
      setSkinAll((f) => (f = false));
      setConsumablesFlag((f) => (f = false));
      setSuperM((f) => (f = true));
    };

    const superFuncMoney = () => {
      pet.money = pet.money + 5;
      setMyPets([...myPets], pet.money);
    };
    const superFuncEnergy = () => {
      pet.energy = pet.energy + 50;
      if (pet.energy > 100) {
        pet.energy = 100
      }
      setMyPets([...myPets], pet.energy);
    };

    return (
      <div className="market-container">
        <h1 className="title-market">Мой магазин</h1>
        <h1 className="title-market-closed" onClick={hiddenMarket}>
          X
        </h1>
        <div className="product-container-market">
          <div className="nav-market">
            <button className={classConsumablesBtn} onClick={showConsumables}>
              Расходники
            </button>
            <button className={classSkinBtn} onClick={showSkin}>
              Скины
            </button>
            <button className={classSkinBtn} onClick={showSuper}>
              Читы
            </button>
          </div>
          <div className="product-main-container">
            {/* Скины */}
            {skinAll ? (
              <div className="product-container">
                <ul style={{ color: "azure" }}>
                  <li>Монет {pet.money}</li>
                </ul>
                <ListBGMarket bg={bg} thisbg={thisBG} salebg={saleBG} />
                {/* <ListBGMarket toy={toy} thisbg={thisBG} salebg={saleBG} /> */}
                <ListToyMarket toy={toy} thistoy={thisToy} />
              </div>
            ) : (
              <></>
            )}
            {/* Расходники */}
            {consumablesFlag ? (
              <div className="product-container">
                <ul style={{ color: "azure" }}>
                  <li>Монет {pet.money}</li>
                  <li>Энергии {pet.energy}</li>
                  <li>Лакомсва {pet.delicacy}</li>
                </ul>
                <ListConsumablesMark
                  thisconsumables={thisConsumables}
                  consumables={consumables}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          <div className="view-container">
            {skinAll ? (
              <div className="market-sale-btn-container">
                {viewerContent && targetSale.type === "bg" ? (
                  <button className="btn-market" onClick={saleBG}>
                    Купить
                  </button>
                ) : (
                  <></>
                )}
                {viewerContent && targetSale.type === "toy" ? (
                  <>
                    <button className="btn-market" onClick={saleToyOne}>
                      Купить игр. 1
                    </button>
                    <button className="btn-market" onClick={saleToyTwo}>
                      Купить игр. 2
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </div>
            ) : (
              <></>
            )}
            {superM ? (
              <>
                <ul style={{ color: "azure" }}>
                  <li>Монет {pet.money}</li>
                  <li>Энергии {pet.energy}</li>
                  <li>Лакомсва {pet.delicacy}</li>
                </ul>
                <button className="btn-market" onClick={superFuncMoney}>
                  Получить 5 монет
                </button>
                <button className="btn-market" onClick={superFuncEnergy}>
                  Получить энергию
                </button>
              </>
            ) : (
              <></>
            )}
            {viewerContent && targetSale.type === "consumables" ? (
              <button className="btn-market" onClick={buyConsumables}>
                Купить
              </button>
            ) : (
              <></>
            )}
            {viewerContent ? (
              <img className="view-img" src={viewerContent} />
            ) : (
              <></>
            )}
          </div>
          {/*  */}
        </div>
      </div>
    );
  }
);

export default Market;
