import React from 'react'

const ItemTextInfo = (props) => {
  return (
    <div className='item-text-info-container'>
      <span className='item-text-info-name'>{props.name}</span><span className='item-text-info-number'>{props.number}</span>
    </div>
  )
}

export default ItemTextInfo
