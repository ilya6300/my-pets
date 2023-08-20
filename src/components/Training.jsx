import React from "react";
import imgTraining from "../img/object/traininng.png";
import ItemTreaning from "./ItemTreaning";

const Training = ({ setFlagTraining, pet, myPets, setMyPets }) => {
  const closedModalT = () => {
    setFlagTraining(false);
  };

  const trainingStrong = () => {
    if (pet.energy >= 15) {
      pet.energy = pet.energy - 15
      pet.strong = pet.strong + 1
    }
    setMyPets([...myPets], pet.energy, pet.strong);
  }

  return (
    <div className="pet-info-back">
      <span className="modal-pet-info-closed" onClick={closedModalT}>
        X
      </span>
      <div className="pet-info-container">
        <span className="training-card-title">Выберите тренировку</span>
        <ItemTreaning
          img={imgTraining}
          text="+1 к силе"
          text_two="расход 15 енергии"
          onClick={trainingStrong}
        />
      </div>
    </div>
  );
};

export default Training;