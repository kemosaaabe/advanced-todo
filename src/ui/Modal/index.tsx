import React, { FC } from "react";

import styles from "./styles.module.css";

interface ModalProps {
  children: React.ReactNode | React.ReactNode[];
  onClose: () => void;
}

const Modal: FC<ModalProps> = ({ onClose, children }) => {
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.code === "Escape") onClose();
  };

  React.useLayoutEffect(() => {
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "visible";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.cover} onClick={onClose}></div>
      <div className={styles.modal}>
        <img
          onClick={onClose}
          className={styles.closeIcon}
          src="/assets/images/close.svg"
          alt="close"
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
