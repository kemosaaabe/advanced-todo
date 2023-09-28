import { FC } from "react";

import styles from "./styles.module.css";

interface ProjectProps {
  title: string;
}

const Project: FC<ProjectProps> = ({ title }) => {
  return <div className={styles.project}>{title}</div>;
};

export default Project;
