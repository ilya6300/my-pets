import React, { memo } from "react";

import imgBirtDay from "../img/event/birthday.png";

const ModalLvlUp = memo((props) => {
  return (
    <div className="modal-lvl-up">
      <div className="modal-lvl-up-container">
        <h1 className="modal-lvl-up-title">Уровень повышен!</h1>
        <p className="modal-lvl-up-body">
          Поздравляем! {props.name_pet} получил уровень {props.level_pet} и
          может забрать награду:
        </p>
        <p className="modal-lvl-up-bonus">Сила повышена</p>
        <p className="modal-lvl-up-bonus">Иммунитет повышен</p>
        <p className="modal-lvl-up-bonus">
          {props.bonus} <span>{props.quantity}</span>
        </p>
        <p className="modal-lvl-up-bonus">Энергия восстановлена</p>
        <div className="modal-lvl-up-img-container">
          <button
            modal-vlv-get-bonus
            onClick={() => props.getbonus(props.get_bonus)}
          >
            Получить
          </button>
          <img className="modal-lvl-up-img" src={imgBirtDay} />
        </div>
      </div>
    </div>
  );
});

export default ModalLvlUp;
