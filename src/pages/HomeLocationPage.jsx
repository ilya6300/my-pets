import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import imgClear from "../img/object/clear.png";

import HeaderStat from "../components/HeaderStat";
import ModalLog from "../components/ModalLog";

import imgExitStreet from "../img/icon/icon-door.png";

const HomeLocationPage = () => {
  const { id } = useParams();
  const [backgroundStyle, setBackgroundStyle] = useState(null);
  const [backgroundStyleStreet, setbackgroundStyleStreet] = useState(null);
  const [pet, setPet] = useState(null);
  const [imgPet, setImgPet] = useState(null);
  const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [flagAction, setFlagAction] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState("");
  const [coordsPet, setCoordsPet] = useState(1);
  const refCoords = useRef();
  const streetLocation = false;
  const MNQ = true;
  const vet = false;
  const [clearFlag, setClearFlag] = useState(false);

  // Получение питомца по id
  useEffect(() => {
    myPets.forEach((pt) => {
      if (String(pt.id) === { id }.id) {
        setPet(pt);
        setImgPet(pt.img_pet[1]);
        setBackgroundStyle(pt.bgHome[0]);
      }
    });
  }, []);
  let coords;

  // Кормление
  const feed = () => {
    setMessage((m) => (m = "Я не хочу есть"));
    if (flagAction) {
      setFlagAction(false);
      if (pet.satiety <= 80) {
        let intervalFeed;
        intervalFeed = setInterval(() => {
          if (pet.satiety < pet.max_satiety) {
            pet.satiety = pet.satiety + 1;
            if (pet.satiety > 100) {
              pet.satiety = 100;
            }
            pet.toilet = pet.toilet - 0.3;
            if (pet.toilet <= 0) {
              pet.toilet = 0;
            }

            setMyPets([...myPets], pet.satiety, pet.toilet);
          } else {
            return clearInterval(intervalFeed);
          }
        }, 100);
        setTimeout(() => {
          console.log("flagAction", flagAction);
          setFlagAction(true);
          clearInterval(intervalFeed);
        }, 6000);
      } else {
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setFlagAction(true);
          setVisibleModal(false);
        }, 3000);
      }
    } else {
      setMessage("Я занят");
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setTimeout(() => {
        setFlagAction(true);
        setVisibleModal(false);
      }, 3000);
    }
  };
  // Игра
  const gameGreenBall = () => {
    if (flagAction) {
      setFlagAction(false);
      if (pet.energy >= 10) {
        setClassGameBall("btn-game-green-ball-active");
        setTimeout(() => {
          setImgPet(pet.img_pet[5]);
          setTimeout(() => {
            setImgPet(pet.img_pet[1]);
            setTimeout(() => {
              setClassGameBall("btn-game-green-ball");
              pet.money = pet.money + 1;
              pet.energy = pet.energy - 10;
              pet.mood = pet.mood + 20;
              if (pet.mood > pet.max_mood) {
                pet.mood = pet.max_mood;
              }
              console.log("flagAction", flagAction);
              setFlagAction(true);
              setMyPets([...myPets], pet.mood, pet.energy);
            }, 1300);
          }, 2600);
        }, 900);
      } else {
        setMessage((m) => (m = "У меня нет сил играть"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setFlagAction(true);
          setVisibleModal(false);
        }, 3000);
      }
    } else {
      setMessage("Я занят");
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setTimeout(() => {
        setFlagAction(true);
        setVisibleModal(false);
      }, 3000);
    }
  };
  const gameCanat = () => {
    if (flagAction) {
      setFlagAction(false);
      if (pet.energy >= 10) {
        setClassGameCanat("btn-game-canat-active");
        setTimeout(() => {
          setImgPet(pet.img_pet[5]);
          setTimeout(() => {
            setImgPet(pet.img_pet[1]);
            setTimeout(() => {
              setClassGameCanat("btn-game-canat");
              pet.money = pet.money + 1;
              pet.energy = pet.energy - 10;
              pet.mood = pet.mood + 30;
              if (pet.mood > pet.max_mood) {
                pet.mood = pet.max_mood;
              }
              console.log("flagAction", flagAction);
              setFlagAction(true);
              setMyPets([...myPets], pet.mood, pet.energy);
            }, 1300);
          }, 3100);
        }, 900);
      } else {
        setMessage((m) => (m = "У меня нет сил играть"));
        coords = refCoords.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setFlagAction(true);
          setVisibleModal(false);
        }, 3000);
      }
    } else {
      setMessage("Я занят");
      coords = refCoords.current.getBoundingClientRect();
      setCoordsPet(coords);
      setVisibleModal(true);
      setTimeout(() => {
        setFlagAction(true);
        setVisibleModal(false);
      }, 3000);
    }
  };

  // Наведение на питомца

  // Убрать какашку
  const clearShit = () => {
    pet.shit = false;
    const newTime = new Date();
    pet.end_toilet = newTime;
    pet.clear = pet.clear - 15;
    if (pet.clear < 0) {
      pet.clear = 0;
    }
    setMyPets([...myPets], pet.shit, pet.clear);
  };

  // Помыть питомца
  const clearPet = () => {
    setClearFlag(true);
    if (flagAction) {
      setFlagAction(false);
      setTimeout(() => {
        let clearPetInterval = setInterval(() => {
          pet.clear = pet.clear + 1;
          setMyPets([...myPets], pet.clear);
          if (pet.clear >= 100) {
            pet.clear = 100;
            setTimeout(() => {
              setFlagAction(true);
              setClearFlag(false);
              return clearInterval(clearPetInterval);
            }, 2000);
          }
        }, 300);
      }, 2000);
    }
  };

  return (
    <div>
      {pet ? (
        <div
          style={{ background: "url(" + backgroundStyle + ")" }}
          className="location-home-body"
        >
          <HeaderStat
            pet={pet}
            setMyPets={setMyPets}
            myPets={myPets}
            setImgPet={setImgPet}
            page={"streetlocation"}
            imgNav={imgExitStreet}
            setBackgroundStyle={setBackgroundStyle}
            backgroundStyle={backgroundStyle}
            streetLocation={streetLocation}
            setbackgroundStyleStreet={setbackgroundStyleStreet}
            backgroundStyleStreet={backgroundStyleStreet}
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
            coordsPet={coordsPet}
            message={message}
            setMessage={setMessage}
            setCoordsPet={setCoordsPet}
            coords={coords}
            refCoords={refCoords}
            flagAction={flagAction}
            setFlagAction={setFlagAction}
            MNQ={MNQ}
            vet={vet}
          />

          <div className="obj-container">
            {clearFlag ? (
              <img className="pet-img clear-img-active" src={imgClear} alt="" />
            ) : (
              <></>
            )}
            <div onClick={clearPet} className="market-container-btn clear-btn">
              <img src={imgClear} alt="" /> Помыть
            </div>
            <img className="pet-img" src={imgPet} ref={refCoords} alt="" />

            <img className="btn-feed" onClick={feed} src={pet.foodObj} alt="" />
            <img
              className={classGameBall}
              onClick={gameGreenBall}
              src={pet.toyOneObj}
              alt=""
            />
            <img
              className={classGameCanat}
              onClick={gameCanat}
              src={pet.toyTwoObj}
              alt=""
            />
            {pet.shit ? (
              <img
                className="shit"
                src={pet.shitObj}
                onClick={clearShit}
                alt=""
              />
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export { HomeLocationPage };
