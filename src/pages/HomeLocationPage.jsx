import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import HeaderStat from "../components/HeaderStat";

const HomeLocationPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [imgPet, setImgPet] = useState(null);
  const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);

  // Получение питомца по id
  useEffect(() => {
    myPets.forEach((pt) => {
      if (String(pt.id) === { id }.id) {
        setPet(pt);
        setImgPet(pt.img_pet[0]);
      }
    });
  }, []);

  // Кормление
  const feed = () => {
    if (pet.satiety <= 80) {
      pet.satiety = pet.satiety + 50;
      if (pet.satiety > 100) {
        pet.satiety = 100;
      }
      setMyPets([...myPets], pet.satiety);
    }
  };
  // Игра
  const gameGreenBall = () => {
    
    setClassGameBall("btn-game-green-ball-active");
    setTimeout(() => {
      setImgPet(pet.img_pet[3]);
      setTimeout(() => {
        setImgPet(pet.img_pet[0]);
        setTimeout(() => {
          setClassGameBall("btn-game-green-ball");
          pet.money = pet.money + 1;

        }, 1300);
      }, 2600);
    }, 900);
    pet.mood = pet.mood + 30;
    if (pet.mood > 100) {
      pet.mood = 100;
    }
    setMyPets([...myPets], pet.mood);
  };
  const gameCanat = () => {
    
    setClassGameCanat("btn-game-canat-active");
    setTimeout(() => {
      setImgPet(pet.img_pet[3]);
      setTimeout(() => {
        setImgPet(pet.img_pet[0]);
        setTimeout(() => {
          setClassGameCanat("btn-game-canat");

          pet.money = pet.money + 1;
        }, 1300);
      }, 3100);
    }, 900);
    pet.mood = pet.mood + 30;
    if (pet.mood > 100) {
      pet.mood = 100;
    }
    setMyPets([...myPets], pet.mood);
  };

  // Наведение на питомца

  const hoverPet = useMemo(() => {
    let hoverTaimer;
    if (hover) {
      console.log("Поглаживание");
      hoverTaimer = setInterval(() => {
        pet.mood = Math.round(pet.mood + 1);
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        clearInterval(hoverTaimer);
      }, 1000);
    }
  }, [hover]);

  return (
    <div className="location-home-body">
      {pet ? (
        <>
          <HeaderStat pet={pet} setMyPets={setMyPets} myPets={myPets} setImgPet={setImgPet}/>

          <img
            className="pet-img"
            onMouseMove={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            src={imgPet}
          />
          <img
            className="btn-feed"
            onClick={feed}
            src="./img/items/food_v2.png"
          />
          <img
            className={classGameBall}
            onClick={gameGreenBall}
            src="./img/items/ball_v1.png"
          />
          <img
            className={classGameCanat}
            onClick={gameCanat}
            src="./img/items/canat.png"
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { HomeLocationPage };
