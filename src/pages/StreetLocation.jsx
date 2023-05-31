import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import HeaderStat from "../components/HeaderStat";

const StreetLocation = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [classPet, setClassPet] = useState("pet-img");
  const [imgPet, setImgPet] = useState(null);
  const [backgroundStyleStreet, setbackgroundStyleStreet] = useState(null);
  // const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  // const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);
  const [flagLoadingPet, setFlagLoadingPet] = useState(false);
  const streetBtn = false;

  // const backgroundStyleStreetActivation = () => {
  //   console.log(setbackgroundStyleStreet(backgroundStyleStreet))
  //   setbackgroundStyleStreet(backgroundStyleStreet)
  // }

  // Получение питомца по id

  useEffect(() => {
    if (pet === null) {
      myPets.forEach((pt) => {
        if (String(pt.id) === { id }.id) {
          setPet((p) => (p = pt));
          setImgPet(pt.img_pet[0]);
          console.log(1);
          // backgroundStyleStreetActivation();
          setbackgroundStyleStreet(pt.currentMeteo[0].bg);
          console.log("<<<<", pt.currentMeteo[0].bg);
          setFlagLoadingPet(true)
          // console.log('pt.currentMeteo[0].bg', pt.currentMeteo[0].bg)
          // console.log('backgroundStyleStreet', backgroundStyleStreet)
          //  setMyPets([...myPets], pt.currentMeteo);
        }
      });
    }
    
  }, []);

  useEffect(() => {
    console.log("2-1");
    // console.log('pt.currentMeteo[0].bg', pt.currentMeteo[0].bg)
    console.log("backgroundStyleStreet", backgroundStyleStreet);
    setbackgroundStyleStreet(backgroundStyleStreet);
  }, [backgroundStyleStreet]);
  useEffect(() => {
    console.log("2-1");
    // console.log('pt.currentMeteo[0].bg', pt.currentMeteo[0].bg)
    console.log("backgroundStyleStreet flagLoadingPet", backgroundStyleStreet);
    setbackgroundStyleStreet(backgroundStyleStreet);
  }, [flagLoadingPet]);

  //   Сходить в туалет
  let intervalUpdateLocalStorageMoveToilet;
  useEffect(() => {
    intervalUpdateLocalStorageMoveToilet = null;
    intervalUpdateLocalStorageMoveToilet = setInterval(() => {
      shitFunc();
    }, 10000);
    return () => clearInterval(intervalUpdateLocalStorageMoveToilet);
  }, [pet]);

  const shitFunc = () => {
    if (flagAction) {
      if (pet.toilet <= 40) {
        setFlagAction(false);
        setClassPet("move-shit");
        setTimeout(() => {
          console.log(1);
          setImgPet(pet.img_pet[1]);

          setTimeout(() => {
            console.log(2);
            pet.toilet = 100;
            setMyPets([...myPets], pet.toilet);
            setImgPet(pet.img_pet[0]);
            setFlagAction(true);
            setTimeout(() => {
              console.log(3);
              setClassPet("pet-img");
            }, 1900);
          }, 3900);
        }, 1100);
      }
    }
  };

  return (
    <div
      style={{ background: "url(" + backgroundStyleStreet + ")" }}
      className="location-street"
    >
      {pet ? (
        <>
          <HeaderStat
            pet={pet}
            setMyPets={setMyPets}
            myPets={myPets}
            setImgPet={setImgPet}
            setbackgroundStyleStreet={setbackgroundStyleStreet}
            backgroundStyleStreet={backgroundStyleStreet}
            streetBtn={streetBtn}
          />
          <Link
            className="link-to-street"
            style={{ color: "green" }}
            to={`/homelocation/${pet.id}`}
          >
            Домой
          </Link>
          <img
            className={classPet}
            onMouseMove={() => setHover(true)}
            onMouseOut={() => setHover(false)}
            src={imgPet}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { StreetLocation };