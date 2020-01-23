import React from "react";
import "./Modal.scss";

const Modal = ({ show, children }) => {
  const className = show ? "modal display-block" : "modal display-none";

  return (
    <div className={className}>
      <section className="modal-main">{children}</section>
    </div>
  );
};

export default Modal;
