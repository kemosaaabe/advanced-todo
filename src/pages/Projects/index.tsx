import Project from "../../components/Project";
import Button from "../../ui/Button";

import styles from "./styles.module.css";

const Projects = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Проекты</h1>
      <Button>Создать проект</Button>
      <div className={styles.projects}>
        {Array(10)
          .fill(null)
          .map(() => (
            <Project />
          ))}
      </div>
    </div>
  );
};

export default Projects;
