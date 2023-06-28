import React, {memo} from "react";
import EffectItemIcon from "./EffectItemIcon";

const EffecrList = memo(({pet, thiseffect }) => {
  return (
    <div>
      {pet.map((effects) => (
        <EffectItemIcon
          effects={effects}
          key={effects.name}
          thiseffect={thiseffect}
        />
      ))}
    </div>
  );
});

export default EffecrList;
