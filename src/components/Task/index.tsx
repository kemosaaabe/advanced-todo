import { FC } from "react";

import { ITask } from "../../store/types";

import styles from "./styles.module.css";
import { useDrag } from "react-dnd";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`${styles.task} ${isDragging && styles.dragTask}`}
    >
      {task.title}
    </div>
  );
};

export default Task;
