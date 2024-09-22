import React from "react";
import { ModalContainer, Overlay, CloseButton, Content, CloseIcon } from "../styled/ModalTask";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>
          <CloseIcon />
        </CloseButton>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
