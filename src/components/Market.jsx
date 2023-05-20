import React, { useEffect, useMemo, useState } from "react";

// Фоны
import imgBackgroundHomeDog from "../img/background/locationHome.png";
import imgBGHomeSpace from "../img/background/kosmicheskii-korabl.png";
import imgBGLitleDragon from "../img/background/bg_dragon.jpg"
import ListBGMarket from "./ListBGMarket";

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
    },
    {
      id: 2,
      title: "Космос",
      img: imgBGHomeSpace,
      price: 3,
    },
    {
      id: 3,
      title: "Пещера дракона",
      img: imgBGLitleDragon,
      price: 4,
    },
    {
      id: 4,
      title: "Дом",
      img: imgBackgroundHomeDog,
      price: 2,
    },
    {
      id: 5,
      title: "Космос",
      img: imgBGHomeSpace,
      price: 3,
    },
    {
      id: 6,
      title: "Пещера дракона",
      img: imgBGLitleDragon,
      price: 4,
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
  // Купить новый фон
  const saleBG = () => {
    if (pet.money >= targetSale.price) {
      pet.bgHome.unshift(viewerContent);
      setBackgroundStyle(pet.bgHome[0]);
      pet.money = pet.money - targetSale.price
      setVisibleMarket(false);
      setMyPets([...myPets], pet.bgHome, pet.money);
    } return
  };

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
          <div className="product-container">
            <ListBGMarket bg={bg} thisbg={thisBG} salebg={saleBG} />
          </div>
        </div>
        <div className="view-container">
          <img className="view-img" src={viewerContent} />
          {viewerContent
          ? <button onClick={saleBG}>Купить</button> : <></>
          }
        </div>
      </div>
    </div>
  );
};

export default Market;
