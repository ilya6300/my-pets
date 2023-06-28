import React, { memo } from "react";

const PetInfoStatMarket = memo((props) => {
  return (
    <ul style={{ color: "azure" }}>
      <li>Монет {Math.floor(props.money)}</li>
      <li>Энергии {Math.floor(props.energy)}</li>
      <li>Лакомсва {Math.floor(props.delicacy)}</li>
    </ul>
  );
});

export default PetInfoStatMarket;
