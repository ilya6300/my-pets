import React, { memo } from 'react'
import ItemBGMarketCard from "./ItemBGMarketCard";

const ListConsumablesMark = memo(({consumables, thisconsumables}) => {
  return (
    <div className="container-bg">
      {consumables.map((bgmarket) => (
        <ItemBGMarketCard
          bgmarket={bgmarket}
          key={bgmarket.id}
          thisbg={thisconsumables}
          // salebg={salebg}
        />
      ))}
    </div>
  )
})

export default ListConsumablesMark