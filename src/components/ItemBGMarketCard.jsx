import React from "react";

const ItemBGMarketCard = (props) => {
  return (
    <div className="market-card" onClick={() => props.thisbg(props.bgmarket)}>
      <h1 className="market-card-title">{props.bgmarket.title}</h1>
      <img className="market-card-img" src={props.bgmarket.img} />
      <div className="market-container-price">
        <span className="market-price">Цена</span>
        <span className="market-price">{props.bgmarket.price}</span>
      </div>
    </div>
  );
};

export default ItemBGMarketCard;
