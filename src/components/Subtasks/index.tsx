import React, { FC } from "react";
import { createPortal } from "react-dom";

import { ITask } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addTask, editTask } from "../../store/actions/tasks";

import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Task from "../Task";

import styles from "./styles.module.css";

interface SubtasksProps {
  parentTask: ITask;
}

const Subtasks: FC<SubtasksProps> = ({ parentTask }) => {
  const subtasks = useAppSelector((state) => state.tasks.tasks).filter(
    (task) => parentTask.id === task.parentTask
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
      id: String(new Date().getTime()),
      parentTask: parentTask.id,
      projectId: String(parentTask.projectId),
      title: value,
      description: "",
      created: new Date(),
      workTime: null,
      finished: null,
      files: [],
      subtasks: [],
      priority: null,
      status: "queue",
    };

    dispatch(addTask(task));

    dispatch(
      editTask({ ...parentTask, subtasks: [...parentTask.subtasks, task] })
    );

    setValue("");
    onCloseAddModal();
  };

  return (
    <div className={styles.subtasks}>
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
      <h3 className={styles.title}>Подзадачи</h3>
      {subtasks && (
        <div className={styles.tasks}>
          {subtasks.map((task) => (
            <Task task={task} />
          ))}
        </div>
      )}
      <Button onClick={onCloseAddModal}>Добавить задачу</Button>
    </div>
  );
};

export default Subtasks;
