import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import HeaderStat from "../components/HeaderStat";
import ModalLog from "../components/ModalLog";

const HomeLocationPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [imgPet, setImgPet] = useState(null);
  const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState("");

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
    setMessage((m) => (m = "Я не голодный"));
    if (flagAction) {
      setFlagAction(false);
      if (pet.satiety <= 80) {
        let intervalFeed;
        intervalFeed = setInterval(() => {
          console.log(pet.satiety);
          if (pet.satiety < 100) {
            pet.satiety = pet.satiety + 1;
            pet.toilet = pet.toilet - 0.3;
            console.log(pet.toilet);
            setMyPets([...myPets], pet.satiety, pet.toilet);
          } else {
            return clearInterval(intervalFeed);
          }
        }, 100);
        setTimeout(() => {
          clearInterval(intervalFeed);
          console.log("clearInterval");
        }, 6000);
      } else {
        setVisibleModal(true);
        console.log("visibleModal", visibleModal);

        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }
      setFlagAction(true);
    } else {
    }
  };
  // Игра
  const gameGreenBall = () => {
    if (flagAction) {
      setFlagAction(false);
      setClassGameBall("btn-game-green-ball-active");
      setTimeout(() => {
        setImgPet(pet.img_pet[3]);
        setTimeout(() => {
          setImgPet(pet.img_pet[0]);
          setTimeout(() => {
            setClassGameBall("btn-game-green-ball");
            pet.money = pet.money + 1;
            pet.energy = pet.energy - 10;
            pet.mood = pet.mood + 20;
            if (pet.mood > 100) {
              pet.mood = 100;
            }
            setMyPets([...myPets], pet.mood, pet.energy);
            setFlagAction(true);
          }, 1300);
        }, 2600);
      }, 900);
    } else {
      return;
    }
  };
  const gameCanat = () => {
    if (flagAction) {
      setFlagAction(false);
      setClassGameCanat("btn-game-canat-active");
      setTimeout(() => {
        setImgPet(pet.img_pet[3]);
        setTimeout(() => {
          setImgPet(pet.img_pet[0]);
          setTimeout(() => {
            setClassGameCanat("btn-game-canat");
            pet.money = pet.money + 1;
            pet.energy = pet.energy - 10;
            pet.mood = pet.mood + 30;
            if (pet.mood > 100) {
              pet.mood = 100;
            }
            setMyPets([...myPets], pet.mood, pet.energy);
          }, 1300);
        }, 3100);
      }, 900);
      setFlagAction(true);
    } else {
      return;
    }
  };

  // Наведение на питомца

  const hoverPet = useMemo(() => {
    let hoverTaimer;
    if (hover) {
      console.log("Поглаживание");
      hoverTaimer = setInterval(() => {
        pet.mood = pet.mood + 1;
        if (pet.mood > 100) {
          pet.mood = 100;
        }
        clearInterval(hoverTaimer);
      }, 1000);
    }
  }, [hover]);

  // Убрать какашку

  const clearShit = () => {
    pet.shit = false;
    const newTime = new Date();
    pet.end_toilet = newTime;
  };

  return (
    <div className="location-home-body">
      {pet ? (
        <>
          <HeaderStat
            pet={pet}
            setMyPets={setMyPets}
            myPets={myPets}
            setImgPet={setImgPet}
          />
          <div>
            <Link className="link-secect-pet" to={`/streetlocation/${pet.id}`}>
              Гулять
            </Link>
            <ModalLog
              visibleModal={visibleModal}
              setVisibleModal={setVisibleModal}
            >
              <p>{message}</p>
            </ModalLog>
            <img
              className="pet-img"
              onMouseMove={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              src={imgPet}
            />
          </div>
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
          {pet.shit ? (
            <img
              className="shit"
              src="./img/object/shit.png"
              onClick={clearShit}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { HomeLocationPage };
