import React, {memo, useEffect} from 'react'

const EffectStat = memo(({pet, setBafMeteo, bafMeteo}) => {
  // const [baf, setBaf] = useState(pet.currentMeteo)
  useEffect(() => {
    setBafMeteo(bafMeteo);
    // console.log("Погода -", pet.currentMeteo[0].meteo);
    // console.log("bafMeteo", bafMeteo[0].meteo);
  }, [ bafMeteo]);

  return <div></div>;
});

export default EffectStat