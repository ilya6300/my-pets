import React, { memo, useEffect } from "react";
import MeteoCardList from "./MeteoCardList";

const News = memo(({ pet,  setVisibleNews }) => {
//   // Функция погоды

//   let intervalUpdateMeteo;
//   useEffect(() => {
//     intervalUpdateMeteo = null;
//     intervalUpdateMeteo = setInterval(() => {
//         meteoFuncion();
//     }, 1500);
//     return () => clearInterval(intervalUpdateMeteo);
//   }, [pet]);

  const hiddenNews = () => {
    setVisibleNews(false);
  };
  
  return (
    <div className="market-container">
      <h1 className="title-news">Погода</h1>
      <h1 className="title-market-closed" onClick={hiddenNews}>
        X
      </h1>
      <div className="meteo-container">
        <div className="weather-now">
            <h1 className="weather-now-title">Сейчас</h1>
            <img className="weather-img-title" src={pet.currentMeteo[0].img} alt="" />
            <p className="weather-text-title">+{pet.currentMeteo[0].temperature}</p>
        </div>
        <div className="weater-text">
            <span>Сейчас</span><span>Позже</span><span>Ещё позже</span>
        </div>
          <MeteoCardList pet={pet} />
      </div>
      <h1 className="title-news">Свежие новости</h1>
    </div>
  );
});

export default News;
