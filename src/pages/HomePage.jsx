import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import CardPetList from "../components/CardPetList";
import SelectAndCreatePets from "../components/SelectAndCreatePets";
import { useLocalStorage } from "../hooks/useLocalStorage";

const HomePage = () => {
  // стиль страницы
  const [backgroundPages, setBackgroundPages] = useState(
    "background-home-page"
  );
  //   Питомцы
  const [targetCard, setTargetCard] = useState(null);
  const [flagCreate, setFlagCreate] = useState(false);
  const [myPets, setMyPets] =
    // useState(
    useLocalStorage(
      [
        {
          id: 1,
          create: false,
        },
        {
          id: 2,      
          create: false,
        },
        {
          id: 3,   
          create: false,
        },
      ],
      "myPets"
    );
  // )
  // Таргет item при клике
  const targetID = (card) => {
    setTargetCard(myPets.find((t) => t.id === card.id));
    console.log(targetCard);
  };

  let intervalUpdateLocalStorageHunger;
  let intervalUpdateLocalStorageMood;
  //   Панель моих питоцев
  const myPetsCollection = useMemo(() => {
    setFlagCreate(false);
    return myPets;
  }, [flagCreate, myPets, intervalUpdateLocalStorageHunger]);

  const clearLocal = () => {
    localStorage.clear();
  };
  const [loadingStatPets, setLoadingStatPets] = useState(false);
  // Расход потребностей

  // Голод
  useEffect(() => {
    if (!loadingStatPets) {
      setLoadingStatPets(true);
      consumptionFood();
    }
    intervalUpdateLocalStorageHunger = null;
    intervalUpdateLocalStorageHunger = setInterval(() => {
      consumptionFood();
    }, 1500000);
    return () => clearInterval(intervalUpdateLocalStorageHunger);
  }, []);
  // Настроение
  useEffect(() => {
    if (!loadingStatPets) {
      setLoadingStatPets(true);
      consumptionMood();
    }
    intervalUpdateLocalStorageMood = null;
    intervalUpdateLocalStorageMood = setInterval(() => {
      consumptionMood();

    }, 2100000);
    return () => clearInterval(intervalUpdateLocalStorageMood);
  }, []);
  // Расходы
  // Голод
  const consumptionMood = () => {
    myPets.forEach((p) => {
      if (p.create === true) {
        const newTime = new Date();
        const oldTime = new Date(p.time_game);
        const diff = Math.round((newTime.getTime() - oldTime.getTime()) / 2100000);
        p.mood = Math.round(p.mood - diff * 1);        
        p.time_game = newTime;
        // Расчёт голода конец
        setMyPets([...myPets], p.time_game);
      }
    });
  };
  // Настроение
  const consumptionFood = () => {
    myPets.forEach((p) => {
      if (p.create === true) {
        const newTime = new Date();
        const oldTime = new Date(p.end_food);
        const diff = Math.round((newTime.getTime() - oldTime.getTime()) / 1500000);
        p.satiety = Math.round(p.satiety - diff * 1);
        p.end_food = newTime;
        p.hp = Math.round((p.satiety + p.mood) / 2);
        // Расчёт голода конец
        setMyPets([...myPets], p.end_food);
      }
    });
  };
  // Удалить питомца

  const removePet = () => {
    targetCard.create = false
    setMyPets([...myPets])
  }

  return (
    <div className={backgroundPages}>
      <div className="container-preview">
        {/*  */}
        {targetCard ? (
          <>
            <SelectAndCreatePets
              myPets={myPets}
              flagCreate={flagCreate}
              setFlagCreate={setFlagCreate}
              targetCard={targetCard}
              setMyPets={setMyPets}
            />
            {targetCard.create ?
            <div className="link-secect-pet-container"><Link className="link-secect-pet" to={`/homelocation/${targetCard.id}`}>Выбрать питомца</Link><span className="remove-pet" onClick={removePet}>Удалить</span></div>
            : <></>
            }

          </>
        ) : (
          <>
            <h1 className="home-title">Выберите питомца</h1>
            <button onClick={clearLocal}>Очистить хранилище</button>
          </>
        )}

        <img
          className="preview-podium"
          src="./img/background/podium.png"
          alt=""
        />
      </div>
      <div className="container-select-pets">
        <CardPetList myPets={myPetsCollection} thisid={targetID} />
      </div>
      {/* HomePage. Go <Link to="/homelocation">You home</Link> */}
    </div>
  );
};

export { HomePage };
