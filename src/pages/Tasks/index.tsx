import React from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { addTask } from "../../store/actions/tasks";
import { ITask, TaskStatus } from "../../store/types";

import Button from "../../ui/Button";
import Input from "../../ui/Input";
import TasksCol from "../../components/TasksCol";

import styles from "./styles.module.css";
import Modal from "../../ui/Modal";
import { editProject, removeProject } from "../../store/actions/projects";

const Tasks = () => {
  const { projectId } = useParams();

  const tasks = useAppSelector((state) => state.tasks.tasks);

  const project = useAppSelector((state) => state.projects.projects).find(
    (project) => project.id === projectId
  );

  const filteredTasks = tasks.filter((task) => task.projectId === projectId);

  const dispatch = useAppDispatch();

  const [visibleAddModal, setVisibleAddModal] = React.useState(false);
  const [visibleEditModal, setVisibleEditModal] = React.useState(false);

  const [projectName, setProjectName] = React.useState("");
  const [taskTitle, setTaskTitle] = React.useState("");

  const navigate = useNavigate();

  const onCloseAddModal = () => {
    setVisibleAddModal(!visibleAddModal);
  };

  const onCloseEditModal = () => {
    setVisibleEditModal(!visibleEditModal);
  };

  const onAddTask = () => {
    if (!taskTitle) return;

    const task: ITask = {
      id: String(new Date().getTime()),
      projectId: String(projectId),
      title: taskTitle,
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

    setTaskTitle("");
    onCloseAddModal();
  };

  const onEditProject = (id: string) => {
    dispatch(editProject(id, projectName));

    setProjectName("");
    onCloseEditModal();
  };

  const onDeleteProject = (id: string) => {
    dispatch(removeProject(id));

    navigate("/");
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
                value={taskTitle}
                placeholder="Название задачи"
                onChange={(e) => {
                  setTaskTitle(e.target.value);
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

      {visibleEditModal &&
        createPortal(
          <Modal onClose={onCloseEditModal}>
            <h2 className={styles.titleModal}>Изменить название проекта</h2>
            <div>
              <Input
                value={projectName}
                placeholder="Новое название"
                onChange={(e) => {
                  setProjectName(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (!projectId) return;
                    onEditProject(projectId);
                  }
                }}
              />
            </div>
            <div className={styles.buttonAdd}>
              <Button
                onClick={() => {
                  if (!projectId) return;
                  onEditProject(projectId);
                }}
              >
                Добавить
              </Button>
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
      <h1 className={styles.title}>{project ? project.title : null}</h1>
      <div className={styles.buttons}>
        <Button onClick={onCloseAddModal}>Создать задачу</Button>
        <Button onClick={onCloseEditModal}>Изменить название проекта</Button>
        <Button
          onClick={() => {
            if (!projectId) return;
            onDeleteProject(projectId);
          }}
        >
          Удалить проект
        </Button>
      </div>

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
