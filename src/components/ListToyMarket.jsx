import React, { memo } from "react";
import ItemBGMarketCard from "./ItemBGMarketCard";

const ListToyMarket = memo(({ toy, thistoy }) => {
  return (
    <div className="container-bg">
      {toy.map((bgmarket) => (
        <ItemBGMarketCard
          bgmarket={bgmarket}
          key={bgmarket.id}
          thisbg={thistoy}
          // salebg={salebg}
        />
      ))}
    </div>
  );
});

export default ListToyMarket;
