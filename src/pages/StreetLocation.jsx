import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import HeaderStat from "../components/HeaderStat";

const StreetLocation = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [classPet, setClassPet] = useState("pet-img");
  const [imgPet, setImgPet] = useState(null);
  // const [classGameBall, setClassGameBall] = useState("btn-game-green-ball");
  // const [classGameCanat, setClassGameCanat] = useState("btn-game-canat");
  const [myPets, setMyPets] = useLocalStorage([], "myPets");
  const [hover, setHover] = useState(false);
  const [flagAction, setFlagAction] = useState(true);

  // Получение питомца по id
  useEffect(() => {
    myPets.forEach((pt) => {
      if (String(pt.id) === { id }.id) {
        setPet((p) => (p = pt));
        setImgPet(pt.img_pet[0]);
        // console.log(pet)
      }
    });
  }, [pet]);
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
    <div className="location-street">
      {pet ? (
        <>
          <HeaderStat
            pet={pet}
            setMyPets={setMyPets}
            myPets={myPets}
            setImgPet={setImgPet}
          />
          <Link className="link-secect-pet" to={`/homelocation/${pet.id}`}>
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
