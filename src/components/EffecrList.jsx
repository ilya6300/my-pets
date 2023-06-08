import React from 'react'
import EffectItemIcon from './EffectItemIcon'

const EffecrList = ({effectPanel, pet}) => {
  return (
    <div>
      {pet.map((effect) => (
        <EffectItemIcon effect={effect} key={effect.name}/>
      ))

      }
    </div>
  )
}

export default EffecrList
