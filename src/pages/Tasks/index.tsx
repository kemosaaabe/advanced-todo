import React from "react";
import { createPortal } from "react-dom";
import { useParams, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTask } from "../../store/actions/tasks";
import { ITask } from "../../store/types";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Task from "../../components/Task";

import styles from "./styles.module.css";
import Modal from "../../ui/Modal";

const Tasks = () => {
  const { projectId } = useParams();

  const tasks = useAppSelector((state) => state.tasks.tasks).filter(
    (task) => task.projectId === projectId
  );

  const dispatch = useAppDispatch();

  const [visibleAddModal, setVisibleAddModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const onCloseAddModal = () => {
    setVisibleAddModal(!visibleAddModal);
  };

  const onAddTask = () => {
    if (!value) return;

    const task: ITask = {
      id: String(tasks.length + 1),
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
