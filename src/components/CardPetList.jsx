import React, { memo } from 'react'
import CardPetItem from './CardPetItem'

const CardPetList = memo(({myPets, thisid}) => {
  return (
    <div className='card-pets-list-container'>
        {myPets.map((card) => (
        <CardPetItem card={card} 
        key={card.id} 
        thisid={thisid}
        />
        ))}
        </div>
  )
})

export default CardPetList