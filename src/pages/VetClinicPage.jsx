import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import HeaderStat from "../components/HeaderStat";
import imgBgVet from "../img/background/vet_bg.png";
import imgExitStreet from "../img/icon/icon-door.png";

const VetClinicPage = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [classPet, setClassPet] = useState("pet-img");
  const [imgPet, setImgPet] = useState(null);
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [messageVet, setMessgaVet] = useState([]);
  // const [backgroundStyle, setBackgroundStyle] = useState(null);
  const [backgroundStyleStreet, setbackgroundStyleStreet] = useState(null);
  // const [hover, setHover] = useState(false);
  // const [flagAction, setFlagAction] = useState(true);
  // const [flagLoadingPet, setFlagLoadingPet] = useState(false);
  const streetLocation = false;
  const MNQ = false;
  const vet = true;
  const [consultation, setConsultation] = useState(false);

  const loadingBg = useMemo(() => {
    return setbackgroundStyleStreet(backgroundStyleStreet);
  }, [backgroundStyleStreet]);
  // Получение координатов
  const [visibleModal, setVisibleModal] = useState(false);
  const [coordsPet, setCoordsPet] = useState(1);
  const [message, setMessage] = useState("");
  const refCoords = useRef();
  let coords;

  // Получение питомца по id

  useEffect(() => {
    if (pet === null) {
      myPets.forEach((pt) => {
        if (String(pt.id) === { id }.id) {
          setPet((p) => (p = pt));
          setImgPet(pt.img_pet[1]);
          console.log(pt.currentMeteo);
        }
      });
    }
  }, []);

  const chechHP = () => {
    // console.log( pet.effect)
    const collectionEffectDisease = [
      <li>Заключение ветеринара:</li>,
      <li>
        <br />
      </li>,
    ];
    pet.effect.forEach((elEff) => {
      if (elEff.type === "disease" && elEff.flag) {
        // console.log('1', elEff)
        collectionEffectDisease.push(
          <li style={{ textAlign: "start" }}> {elEff.consultation} </li>,
          <li>
            <br />
          </li>
        );
        // setMessgaVet(collectionEffectDisease);
      }
    });
    if (collectionEffectDisease.length === 0) {
      console.log("здоров");
      collectionEffectDisease.push(pet.effect[0].consultation);
      // setMessgaVet(collectionEffectDisease);
    }
    collectionEffectDisease.push(
      <li style={{ textAlign: "end" }}> "Доктор: Шиба-инов" </li>
    );
    setMessgaVet(collectionEffectDisease);
    setConsultation(true)
  };

  return (
    <div
      className="location-vet"
      style={{
        background: "url(" + imgBgVet + ")",
      }}
    >
      {pet !== null ? (
        <HeaderStat
          pet={pet}
          setMyPets={setMyPets}
          myPets={myPets}
          setImgPet={setImgPet}
          page={"streetlocation"}
          // setBackgroundStyle={setBackgroundStyle}
          // backgroundStyle={backgroundStyle}
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
          imgNav={imgExitStreet}
        />
      ) : (
        <></>
      )}

      <button className="btnCheckHP" onClick={chechHP}>
        Проверить самочувствие питомца
      </button>
      {consultation ? <ul className="consultation">{messageVet}</ul> : <></>}

      <img
        ref={refCoords}
        className={classPet}
        style={{ bottom: "29%" }}
        src={imgPet}
      />
    </div>
  );
};

export { VetClinicPage };
