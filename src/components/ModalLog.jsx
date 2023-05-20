import React, { memo } from "react";

const ModalLog = memo(({ children, visibleModal, coordsPet }) => {
  const classModal = ["hidden "];
  if (visibleModal) {
    classModal.push("modal-log-container");
  }
  return (
    <div className={classModal.join(" ")} 
    style={{ left: coordsPet.left + 70 + 'px', bottom: coordsPet.height + 100 + 'px'}}       
    >
      {children}
    </div>
  );
});

export default ModalLog;
