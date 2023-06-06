import React, { useEffect, useMemo, useState } from "react";

const BafState = ({ pet, setBafMeteo, bafMeteo }) => {
  // const [baf, setBaf] = useState(pet.currentMeteo)
  useEffect(() => {
    setBafMeteo(bafMeteo);
    console.log("Погода -", pet.currentMeteo[0].meteo);
  }, [setBafMeteo, bafMeteo]);

  return <div></div>;
};

export default BafState;
