import React from 'react';

import { Heading, View } from '@aws-amplify/ui-react';

import './Modal.css'; // Assuming you have some basic styles

interface ModalProps {
	closeModal: () => void;
	title: string;
	children: React.ReactNode
}

const Modal = ({ children, closeModal, title }: ModalProps) => {
  return (
    <View className="modal-backdrop" onClick={closeModal}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={closeModal} className="close-button">X</button>
        <div className="modal-body">
          <Heading level={2}>{title}</Heading>
          <p>{children}</p>
        </div>
      </div>
    </View>
  );
}

export default Modal;
