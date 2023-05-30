import React, { memo } from "react";
import MeteoCardItem from "./MeteoCardItem";

const MeteoCardList = memo(({ pet }) => {
  return (
    <div className='weather-forecast'>
      {pet.currentMeteo.map((meteo) => (
        <MeteoCardItem meteo={meteo} key={Math.random()} />
      ))}
    </div>
  );
})

export default MeteoCardList;
