import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CardPetList from "../components/CardPetList";
import SelectAndCreatePets from "../components/SelectAndCreatePets";
import { useLocalStorage } from "../hooks/useLocalStorage";
import podium from "../img/background/podium.png";
import Needs from "../components/Needs";

const HomePage = () => {
  useEffect(() => {
    window.scrollBy(0, 0);
  });
  // стиль страницы
  const [backgroundPages, setBackgroundPages] = useState(
    "background-home-page"
  );
  //   Питомцы
  const [pet, setPet] = useState(null);
  const [targetCard, setTargetCard] = useState(null);
  const [flagCreate, setFlagCreate] = useState(false);
  const [myPets, setMyPets] =

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
  // Таргет item при клике
  const targetID = (card) => {
    setTargetCard(myPets.find((t) => t.id === card.id));
  };

  //   Панель моих питоцев
  const myPetsCollection = useMemo(() => {
    setFlagCreate(false);
    return myPets;
  }, [flagCreate, myPets]);

 

  // Удалить питомца

  const removePet = () => {
    targetCard.create = false;
    setMyPets([...myPets]);
  };

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
            {targetCard.create ? (
              <div className="link-secect-pet-container">
                <Link
                  className="link-secect-pet"
                  to={`/homelocation/${targetCard.id}`}
                >
                  Выбрать питомца
                </Link>
                <span className="remove-pet" onClick={removePet}>
                  Удалить
                </span>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <>
            <h1 className="home-title">Выберите питомца</h1>
          </>
        )}

        <img
          className="preview-podium"
          src={podium}
          alt=""
        />
      </div>
      <div className="container-select-pets">
        <CardPetList myPets={myPetsCollection} thisid={targetID} />
      </div>
    </div>
  );
};

export { HomePage };
