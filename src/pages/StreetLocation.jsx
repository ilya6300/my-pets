import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import HeaderStat from "../components/HeaderStat";
import EventSrteet from "../components/EventSrteet";

import Training from "../components/Training";

const StreetLocation = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [classPet, setClassPet] = useState("pet-img");
  const [imgPet, setImgPet] = useState(null);
  const [backgroundStyle, setBackgroundStyle] = useState(null);
  const [backgroundStyleStreet, setbackgroundStyleStreet] = useState(null);
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);
  const [flagLoadingPet, setFlagLoadingPet] = useState(false);
  const streetLocation = true;
  const MNQ = true;
  const vet = false;
  const [flagTraining, setFlagTraining] = useState(false);

  // Получение питомца по id

  useEffect(() => {
    if (pet === null) {
      myPets.forEach((pt) => {
        if (String(pt.id) === { id }.id) {
          setPet((p) => (p = pt));
          setImgPet(pt.img_pet[1]);
          setbackgroundStyleStreet(pt.currentMeteo[0].bg);
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
        setImgPet(pet.img_pet[6]); // Бег
        setFlagAction(false);
        setClassPet("move-shit");
        setTimeout(() => {
          // console.log(1);
          setImgPet(pet.img_pet[7]);
          pet.clear = pet.clear - 10;
          if (pet.clear < 0) {
            pet.clear = 0;
          }
          setTimeout(() => {
            // console.log(2);
            pet.toilet = 100;
            setMyPets([...myPets], pet.toilet);
            setImgPet(pet.img_pet[6]); // Бег

            setTimeout(() => {
              console.log("flagAction", flagAction);
              setFlagAction(true);
              setImgPet(pet.img_pet[1]);
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
            MNQ={MNQ}
            vet={vet}
          />

          <Link
            className="link-to-street"
            style={{ color: "green" }}
            to={`/homelocation/${pet.id}`}
          >
            Домой
          </Link>
          <Link
            className="link-to-street"
            style={{ color: "green" }}
            to={`/vetClinicPage/${pet.id}`}
          >
            В вет. клинику
          </Link>
          <span
            className="link-to-street"
            style={{ color: "green" }}
            onClick={() => setFlagTraining(true)}
          >
            Тренироваться
          </span>
          <div className="obj-container">
            <img
              className={classPet}
              onMouseMove={() => setHover(true)}
              onMouseOut={() => setHover(false)}
              src={imgPet}
              ref={refCoords}
            />

            <EventSrteet
              pet={pet}
              setMyPets={setMyPets}
              myPets={myPets}
              setVisibleModal={setVisibleModal}
              setMessage={setMessage}
              setCoordsPet={setCoordsPet}
              coords={coords}
              refCoords={refCoords}
            />
            {flagTraining ? (
              <Training
                setFlagTraining={setFlagTraining}
                myPets={myPets}
                pet={pet}
                setMyPets={setMyPets}
              />
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export { StreetLocation };
