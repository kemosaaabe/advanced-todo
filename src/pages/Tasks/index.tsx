import { useParams, Link } from "react-router-dom";

import { useAppSelector } from "../../app/hooks";

import Button from "../../ui/Button";
import Task from "../../components/Task";

import styles from "./styles.module.css";

const Tasks = () => {
  const { projectId } = useParams();

  const tasks = useAppSelector((state) => state.tasks.tasks).filter(
    (task) => task.projectId === projectId
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
            {tasks
              .filter((task) => task.status === "queue")
              .map((task) => (
                <Task task={task} key={task.id} />
              ))}
          </div>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titleCol}>Development</h2>
          <div className={styles.colInner}>
            {tasks
              .filter((task) => task.status === "dev")
              .map((task) => (
                <Task task={task} key={task.id} />
              ))}
          </div>
        </div>
        <div className={styles.col}>
          <h2 className={styles.titleCol}>Done</h2>
          <div className={styles.colInner}>
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <Task task={task} key={task.id} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
