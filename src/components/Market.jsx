import React, { useEffect, useMemo, useState } from "react";

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

//
import ListBGMarket from "./ListBGMarket";
import ListToyMarket from "./ListToyMarket";

const Market = ({
  pet,
  myPets,
  setMyPets,
  setVisibleMarket,
  setBackgroundStyle,
  backgroundStyle,
}) => {
  const [viewerContent, setViewerContent] = useState(null);
  const [targetSale, setTargetSale] = useState(null);
  // const [flagSaleHomeImg, setFlagSaleHomeImg] = useState(false);

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

  const hiddenMarket = () => {
    setVisibleMarket(false);
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

  useEffect(() => {
    setBackgroundStyle(backgroundStyle);
  }, [backgroundStyle]);

  useEffect(() => {
    setBackgroundStyle(backgroundStyle);
  }, [backgroundStyle]);

  return (
    <div className="market-container">
      <h1 className="title-market">Мой магазин</h1>
      <h1 className="title-market-closed" onClick={hiddenMarket}>
        X
      </h1>
      <div className="product-container-market">
        <div className="product-main-container">
          {/*  */}
          <div className="product-container">
            <ListBGMarket bg={bg} thisbg={thisBG} salebg={saleBG} />
            {/* <ListBGMarket toy={toy} thisbg={thisBG} salebg={saleBG} /> */}
            <ListToyMarket toy={toy} thistoy={thisToy} />
          </div>
        </div>
        <div className="view-container">
          <div className="market-sale-btn-container">
            {viewerContent && targetSale.type === "bg" ? (
              <button onClick={saleBG}>Купить</button>
            ) : (
              <></>
            )}
            {viewerContent && targetSale.type === "toy" ? (
              <>
                <button onClick={saleToyOne}>Купить игр. 1</button>
                <button onClick={saleToyTwo}>Купить игр. 2</button>
              </>
            ) : (
              <></>
            )}
          </div>
          <img className="view-img" src={viewerContent} />
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Market;
