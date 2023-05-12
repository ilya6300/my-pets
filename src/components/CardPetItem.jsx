import React from "react";
import iconCreateNewPet from "../img/icon/icon-create-new.png"

const CardPetItem = (props) => {
  return (
    <div className="card-pets" 
    // onClick={() => console.log(props.card.id)}
    onClick={() => props.thisid(props.card)}
    >
      {props.card.create ? (
        <>
          <h1>{props.card.name}</h1>
          <ul>
            <li>Сытость: {props.card.satiety}</li>
          </ul>
          <img className="img-pet-card" src={props.card.img_pet[0]} />
        </>
      ) : (
        <div className="new-card">
        <h1 className="create-title">Создать нового</h1>
        <img className="create-img" src={iconCreateNewPet}/>
        </div>
      )}
    </div>
  );
};

export default CardPetItem;
