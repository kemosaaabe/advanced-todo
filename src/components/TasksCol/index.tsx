import { FC } from "react";
import { useDrop } from "react-dnd";

import { useAppDispatch } from "../../app/hooks";
import { editTask } from "../../store/actions/tasks";
import { ITask, TaskStatus } from "../../store/types";

import Task from "../Task";

import styles from "./styles.module.css";

interface TaskColProps {
  title: string;
  status: TaskStatus;
  tasks: ITask[];
}

const TasksCol: FC<TaskColProps> = ({ tasks, title, status }) => {
  const dispatch = useAppDispatch();

  const addTaskToCol = (id: string) => {
    const currentTask = tasks.find((task) => task.id === id);

    if (!currentTask) return;

    if (currentTask.status === status) return;

    dispatch(editTask({ ...currentTask, status: status }));
  };

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: (item: { id: string }) => addTaskToCol(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [tasks]
  );

  return (
    <div className={`${styles.col} ${isOver && styles.activeCol}`} ref={drop}>
      <h2 className={styles.titleCol}>{title}</h2>
      <div className={styles.colInner}>
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Task task={task} key={task.id} />
          ))}
      </div>
    </div>
  );
};

export default TasksCol;