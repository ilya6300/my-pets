import React, { memo,useEffect, useState } from 'react'

const GetEffectStreet = memo(({pet, setBafMeteo, bafMeteo}) => {

//   const [bafMeteo, setBafMeteo] = useState(pet.currentMeteo)
  useEffect(() => {
    setBafMeteo(bafMeteo);
    if (bafMeteo[0].meteo === "Дождь" && pet.effect[3].flag !== true) {
      setTimeout(() => {
        pet.effect[0].flag = false
        pet.effect[3].flag = true
      }, 3000);
    } else if (
      bafMeteo[0].meteo === "Очень жарко" &&
      pet.effect[2].flag !== true
    ) {
      setTimeout(() => {
        pet.effect[0].flag = false
        pet.effect[2].flag = true
      }, 3000);
    }
  }, [bafMeteo]);

  return (
    <div>
      
    </div>
  )
})

export default GetEffectStreet
