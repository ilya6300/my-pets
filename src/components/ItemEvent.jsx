import React from "react";

const ItemEvent = (props) => {
  return (
    <div className="card-event-container">
      <h1 className="card-event-title">{props.event.title}</h1>
      <p>{props.event.body}</p>
      <p>Как ответить?</p>
      <div className="card-event-container-btn">
        <button className="card-event-btn" onClick={() => props.yes(props.event)}>
          {props.event.yes_text}
        </button>

        <button className="card-event-btn" onClick={() => props.no(props.event)}>
          {props.event.no_text}
        </button>
      </div>
    </div>
  );
};

export default ItemEvent;
