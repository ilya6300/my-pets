import React from "react";
import ItemEvent from "./ItemEvent";

const ListEvent = ({ eventCollection }) => {
  return (
    <div className="list-event-container">
      {eventCollection.map((event) => (
        <ItemEvent key={event.id} event={event} no={event.no} yes={event.yes} ignor={event.ignor}/>
      ))}
    </div>
  );
};

export default ListEvent;
