import React from "react";

const ItemTreaning = (props) => {
  return (
    <div className="training-item">
      <img className="training-img" src={props.img} alt="" />
      <div className="training-item-info-container">
        <div>
          <span className="training-item-text">{props.text},</span>
          <span className="training-item-text">{props.text_two}</span>
        </div>
        <div>
          <button onClick={props.onClick}>Начать тренировку</button>
        </div>
      </div>
    </div>
  );
};

export default ItemTreaning;
