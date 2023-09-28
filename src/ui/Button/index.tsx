import { FC } from "react";

import styles from "./styles.module.css";

interface ButtonProps {
  children: string;
  onClick?: () => void;
}

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
