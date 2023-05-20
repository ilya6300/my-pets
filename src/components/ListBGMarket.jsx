import React, { memo } from "react";
import ItemBGMarketCard from "./ItemBGMarketCard";

const ListBGMarket = memo(({ bg, thisbg, salebg }) => {
  return (
    <div className="container-bg">
      {bg.map((bgmarket) => (
        <ItemBGMarketCard
          bgmarket={bgmarket}
          key={bgmarket.id}
          thisbg={thisbg}
          // salebg={salebg}
        />
      ))}
    </div>
  );
});

export default ListBGMarket;
