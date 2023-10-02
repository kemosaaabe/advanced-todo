import { FC } from "react";
import { useDrop } from "react-dnd";

import { useAppDispatch } from "../../app/hooks";
import { editTask } from "../../store/actions/tasks";
import { ITask, TaskStatus } from "../../store/types";

import Task from "../Task";

import styles from "./styles.module.css";
import calculateDateDifference from "../../utils/calculateDateDifference";

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

    dispatch(
      editTask({
        ...currentTask,
        finished: null,
        workTime: null,
        status: status,
      })
    );

    if (status === "done") {
      dispatch(
        editTask({
          ...currentTask,
          finished: new Date(),
          workTime: calculateDateDifference(currentTask.created, new Date()),
          status: status,
        })
      );

      if (currentTask.subtasks.length > 0) {
        currentTask.subtasks.forEach((task) =>
          dispatch(
            editTask({
              ...task,
              status: "done",
              workTime: calculateDateDifference(task.created, new Date()),
              finished: new Date(),
            })
          )
        );
      }
    }
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
