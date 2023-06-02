import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import HeaderStat from "../components/HeaderStat";

const StreetLocation = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [classPet, setClassPet] = useState("pet-img");
  const [imgPet, setImgPet] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);

  const [backgroundStyleStreet, setbackgroundStyleStreet] = useState(null);
  // const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  // const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);
  const [flagLoadingPet, setFlagLoadingPet] = useState(false);
  const streetBtn = false;

  // Получение питомца по id

  useEffect(() => {
    if (pet === null) {
      myPets.forEach((pt) => {
        if (String(pt.id) === { id }.id) {
          setPet((p) => (p = pt));
          setImgPet(pt.img_pet[0]);
          console.log(1);
          setbackgroundStyleStreet(pt.currentMeteo[0].bg);
          console.log("<<<<", pt.currentMeteo[0].bg);
          setFlagLoadingPet(true);
        }
      });
    }
  }, []);

  const loadingBg = useMemo(() => {
    return setbackgroundStyleStreet(backgroundStyleStreet);
  }, [backgroundStyleStreet]);
  // Получение координатов
  const [visibleModal, setVisibleModal] = useState(false);
  const [coordsPet, setCoordsPet] = useState(1);
  const [message, setMessage] = useState("");
  const refCoords = useRef();
  let coords;

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
            page={"streetlocation"}
            // imgNav={imgExitStreet}
            setBackgroundStyle={setBackgroundStyle}
            backgroundStyle={backgroundStyle}
            streetBtn={streetBtn}
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
          />
          {/* <HeaderStat
            pet={pet}
            setMyPets={setMyPets}
            myPets={myPets}
            setImgPet={setImgPet}
            setbackgroundStyleStreet={setbackgroundStyleStreet}
            backgroundStyleStreet={backgroundStyleStreet}
            streetBtn={streetBtn}
            setBackgroundStyle ={setBackgroundStyle }
            visibleModal={visibleModal}
            setVisibleModal={setVisibleModal}
            coordsPet={coordsPet}
            message={message}
            setMessage={setMessage}
            setCoordsPet={setCoordsPet}
            coords={coords}
            refCoords={refCoords}
          /> */}
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
            ref={refCoords}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { StreetLocation };
