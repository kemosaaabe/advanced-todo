import React from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTask } from "../../store/actions/tasks";
import { ITask, TaskStatus } from "../../store/types";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TasksCol from "../../components/TasksCol";

import styles from "./styles.module.css";
import Modal from "../../ui/Modal";

const Tasks = () => {
  const { projectId } = useParams();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filteredTasks = tasks.filter((task) => task.projectId === projectId);

  const dispatch = useAppDispatch();

  const [visibleAddModal, setVisibleAddModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onCloseAddModal = () => {
    setVisibleAddModal(!visibleAddModal);
  };

  const onAddTask = () => {
    if (!value) return;

    const task: ITask = {
      id: String(Number(tasks[tasks.length - 1].id) + 1),
      projectId: String(projectId),
      title: value,
      description: "",
      created: new Date(),
      workTime: null,
      finished: null,
      priority: null,
      status: "queue",
    };

    dispatch(addTask(task));

    setValue("");
    onCloseAddModal();
  };

  const cols: { id: number; title: string; status: TaskStatus }[] = [
    { id: 0, title: "Queue", status: "queue" },
    { id: 1, title: "Development", status: "dev" },
    { id: 2, title: "Done", status: "done" },
  ];

  return (
    <div className={styles.container}>
      {visibleAddModal &&
        createPortal(
          <Modal onClose={onCloseAddModal}>
            <h2 className={styles.titleModal}>Добавить задачу</h2>
            <div>
              <Input
                value={value}
                placeholder="Название задачи"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onAddTask();
                  }
                }}
              />
            </div>
            <div className={styles.buttonAdd}>
              <Button onClick={onAddTask}>Добавить</Button>
            </div>
          </Modal>,
          document.body
        )}

      <Link to="/">
        <img
          className={styles.arrow}
          src="/assets/images/arrow.svg"
          alt="arrow back"
        />
      </Link>
      <h1 className={styles.title}>Задачи</h1>
      <Button onClick={onCloseAddModal}>Создать задачу</Button>
      <div className={styles.tasks}>
        {cols.map((col) => (
          <TasksCol
            key={col.id}
            title={col.title}
            status={col.status}
            tasks={filteredTasks}
          />
        ))}
      </div>
    </div>
  );
};

export default Tasks;
