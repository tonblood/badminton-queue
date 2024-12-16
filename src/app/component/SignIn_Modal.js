// components/Modal.js
import React from 'react';
import styles from '../app/styles/signIn_modal.module.css';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <div
      className={`${styles.modalOverlay} ${isOpen ? styles.open : ''}`}
      onClick={onClose}
    >
      <div
        className={styles.modalContent}
        onClick={(e) => e.stopPropagation()} // ป้องกันการคลิกที่ background
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
