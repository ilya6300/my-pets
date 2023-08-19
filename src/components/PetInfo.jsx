import React from "react";
import ItemTextInfo from "./ItemTextInfo";

const PetInfo = ({setFlagInfo, pet}) => {
    const closedModalI = () => {
        setFlagInfo(false)
    }
  return (
    <div className="pet-info-back">
        <span className="modal-pet-info-closed" onClick={closedModalI}>X</span>
      <div className="pet-info-container">
        <span className="modal-pet-info-title">Дополнительные характеристики</span>
        <ItemTextInfo name="Иммунитет" number={pet.immunity}/>
        <ItemTextInfo name="Сила" number={pet.strong}/>
      </div>
    </div>
  );
};

export default PetInfo;
