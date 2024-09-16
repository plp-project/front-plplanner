import React, { useState } from 'react';
import { ModalContainer, Overlay, CloseButton, Content } from '../styled/ModalTask';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Content>{children}</Content>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;