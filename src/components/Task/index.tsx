import { FC } from "react";

import { ITask } from "../../store/types";

import styles from "./styles.module.css";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  return <div className={styles.task}>{task.title}</div>;
};

export default Task;
