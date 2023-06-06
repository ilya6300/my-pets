import React, {useEffect} from 'react'

const EffectStat = ({pet, setBafMeteo, bafMeteo}) => {
  // const [baf, setBaf] = useState(pet.currentMeteo)
  useEffect(() => {
    setBafMeteo(bafMeteo);
    console.log("Погода -", pet.currentMeteo[0].meteo);
    console.log("bafMeteo", bafMeteo[0].meteo);
  }, [setBafMeteo, bafMeteo,]);

  return <div></div>;
};

export default EffectStat