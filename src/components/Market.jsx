import React, { useState } from "react";

// Фоны
import imgBackgroundHomeDog from "../img/background/locationHome.png";
import imgBGHomeSpace from "../img/background/kosmicheskii-korabl.jpg";

const Market = ({ pet, myPets, setMyPets }) => {

const [viewerContent, setViewerContent] = useState(null)

  // Купить фон тест
const setHomeImg = () => {
    setViewerContent(imgBackgroundHomeDog)
}
const saleHomeImg = () => {
    setViewerContent(imgBackgroundHomeDog)
    pet.bgHome = [viewerContent]
}
const setSpaceImg = () => {
    setViewerContent(imgBGHomeSpace)
}
const saleSpaceImg = () => {
    setViewerContent(imgBGHomeSpace)
    pet.bgHome = [viewerContent]
}

  return (
    <div className="market-container">
      <h1 className="title-market">Мой магазин</h1>
      <div className="product-main-container">
        <div className="product-container">
          <div className="market-card">
            <h1 className="market-card-title">Дом</h1>
            <img className="market-card-img" src={imgBackgroundHomeDog} />
            <div className="market-container-price">
              <span className="market-price">Цена</span>
              <span className="market-price">5</span>
            </div>
            <button className="market-card-btn" 
            onClick={setHomeImg}
            >
                Просмотр</button>
            <button className="market-card-btn" onClick={saleHomeImg}>Купить</button>
          </div>
          <div className="market-card">
            <h1 className="market-card-title">Космос</h1>
            <img className="market-card-img" src={imgBGHomeSpace} />
            <div className="market-container-price">
              <span className="market-price">Цена</span>
              <span className="market-price">5</span>
            </div>
            <button className="market-card-btn" 
            onClick={setHomeImg}
            >
                Просмотр</button>
            <button className="market-card-btn" onClick={setSpaceImg}>Купить</button>
          </div>
          <div className="market-card">
            <h1 className="market-card-title">Дом</h1>
            <img className="market-card-img" src={imgBackgroundHomeDog} />
            <div className="market-container-price">
              <span className="market-price">Цена</span>
              <span className="market-price">5</span>
            </div>
           <button className="market-card-btn" 
            onClick={setHomeImg}
            >
                Просмотр</button>
            <button className="market-card-btn" onClick={saleHomeImg}>saleSpaceImg</button>
          </div>
          <div className="market-card">
            <h1 className="market-card-title">Космос</h1>
            <img className="market-card-img" src={imgBGHomeSpace} />
            <div className="market-container-price">
              <span className="market-price">Цена</span>
              <span className="market-price">5</span>
            </div>
           <button className="market-card-btn" 
            onClick={setSpaceImg}
            >
                Просмотр</button>
            <button className="market-card-btn" onClick={saleSpaceImg}>Купить</button>
          </div>
        </div>
      </div>
      <div className="view-container">
        <img className="view-img" src={viewerContent} />
      </div>
    </div>
  );
};

export default Market;
