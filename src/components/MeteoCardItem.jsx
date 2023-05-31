import React, { memo } from 'react'

const MeteoCardItem = memo((props) => {
  return (
    <div >
        <img className="weather-img" src={props.meteo.img} alt="" />
        <p className="weather-text">+{props.meteo.temperature}</p>
    </div>
  )
})

export default MeteoCardItem