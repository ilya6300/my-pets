import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";

import HeaderStat from "../components/HeaderStat";
import ModalLog from "../components/ModalLog";

// Импорт изображений
// import imgFood from "../img/items/food_v2.png";
// import imgBallGreen from "../img/items/ball_v1.png";
// import imgCanat from "../img/items/canat.png";
// import imgShit from "../img/object/shit.png";
import imgExitStreet from "../img/icon/icon-door.png";

const HomeLocationPage = () => {
  const { id } = useParams();
  const [backgroundStyle, setBackgroundStyle] = useState(null);
  const [pet, setPet] = useState(null);
  const [imgPet, setImgPet] = useState(null);
  const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const [message, setMessage] = useState("");
  const [coordsPet, setCoordsPet] = useState(1);
  const ref = useRef();

  // Получение питомца по id
  useEffect(() => {
    myPets.forEach((pt) => {
      if (String(pt.id) === { id }.id) {
        setPet(pt);
        setImgPet(pt.img_pet[0]);
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
          if (pet.satiety < 100) {
            pet.satiety = pet.satiety + 1;
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
          clearInterval(intervalFeed);
        }, 6000);
      } else {
        coords = ref.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }
      setFlagAction(true);
    }
  };
  // Игра
  const gameGreenBall = () => {
    setMessage((m) => (m = "У меня нет сил играть"));
    if (flagAction) {
      setFlagAction(false);
      if (pet.energy >= 10) {
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
            }, 1300);
          }, 2600);
        }, 900);
      } else {
        coords = ref.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }

      setFlagAction(true);
    }
  };
  const gameCanat = () => {
    setMessage((m) => (m = "У меня нет сил играть"));
    if (flagAction) {
      setFlagAction(false);
      if (pet.energy >= 10) {
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
      } else {
        coords = ref.current.getBoundingClientRect();
        setCoordsPet(coords);
        setVisibleModal(true);
        setTimeout(() => {
          setVisibleModal(false);
        }, 3000);
      }

      setFlagAction(true);
    }
  };

  // Наведение на питомца

  const hoverPet = useMemo(() => {
    let hoverTaimer;
    if (hover) {
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
    setMyPets([...myPets], pet.shit);
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
          />
          {/* <Link className="link-to-street" to={`/streetlocation/${pet.id}`}>
            <img src={imgExitStreet} alt="" />
            Гулять
          </Link> */}
          <div>
            <ModalLog
              visibleModal={visibleModal}
              setVisibleModal={setVisibleModal}
              coordsPet={coordsPet}
            >
              {visibleModal ? <p>{message}</p> : <></>}
            </ModalLog>

            <img
              className="pet-img"
              onMouseMove={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              src={imgPet}
              ref={ref}
            />

            <img className="btn-feed" onClick={feed} src={pet.foodObj} />
            <img
              className={classGameBall}
              onClick={gameGreenBall}
              src={pet.toyOneObj}
            />
            <img
              className={classGameCanat}
              onClick={gameCanat}
              src={pet.toyTwoObj}
            />
            {pet.shit ? (
              <img className="shit" src={pet.shitObj} onClick={clearShit} />
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
