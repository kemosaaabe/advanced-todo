import { FC } from "react";
import { Link } from "react-router-dom";

import { IProject } from "../../store/types";

import styles from "./styles.module.css";

interface ProjectProps {
  project: IProject;
}

const Project: FC<ProjectProps> = ({ project }) => {
  return (
    <Link className={styles.project} to={`/projects/${project.id}`}>
      {project.title}
    </Link>
  );
};

export default Project;
