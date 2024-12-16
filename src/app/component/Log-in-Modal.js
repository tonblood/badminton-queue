import React from "react";
import styles from "../styles/Log-in-Modal.module.css"

import PropTypes from "prop-types";

export default function LogIn_Modal({ isOpen, onClose, children }) {
  return (
    <div>
      
    </div>
  );
}

LogIn_Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};
