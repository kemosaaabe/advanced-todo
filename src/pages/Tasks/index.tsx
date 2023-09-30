import { useParams, Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import Button from "../../ui/Button";
import Task from "../../components/Task";

import styles from "./styles.module.css";

const Tasks = () => {
  const { projectId } = useParams();

  const project = useAppSelector((state) =>
    state.projects.projects.find((project) => project.id === projectId)
  );

  return (
    <div className={styles.container}>
      <Link to="/">
        <img
          className={styles.arrow}
          src="/assets/images/arrow.svg"
          alt="arrow back"
        />
      </Link>
      <h1 className={styles.title}>Задачи</h1>
      <Button>Создать задачу</Button>
      <div className={styles.tasks}>
        <div className={styles.col}>
          <h2 className={styles.titleCol}>Queue</h2>
          <div className={styles.colInner}>
            {Array(10)
              .fill(null)
              .map(() => (
                <Task />
              ))}
          </div>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titleCol}>Development</h2>
          <div className={styles.colInner}>
            {Array(10)
              .fill(null)
              .map(() => (
                <Task />
              ))}
          </div>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titleCol}>Done</h2>
          <div className={styles.colInner}>
            {Array(10)
              .fill(null)
              .map(() => (
                <Task />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
