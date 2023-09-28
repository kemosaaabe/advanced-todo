import React from "react";
import { createPortal } from "react-dom";

import { addProject } from "../../store/actions/projects";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Project from "../../components/Project";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Modal from "../../ui/Modal";

import styles from "./styles.module.css";

const Projects = () => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const projects = useAppSelector((state) => state.projects.projects);
  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onAddProject = () => {
    if (!value) return;

    const project = { id: String(projects.length + 1), title: value };
    dispatch(addProject(project));

    setValue("");
    onCloseModal();
  };

  return (
    <div className={styles.container}>
      {visibleModal &&
        createPortal(
          <Modal onClose={onCloseModal}>
            <h2 className={styles.titleModal}>Добавить проект</h2>
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onAddProject();
                }
              }}
            />
            <div className={styles.buttonAdd}>
              <Button onClick={onAddProject}>Добавить</Button>
            </div>
          </Modal>,
          document.body
        )}

      <h1 className={styles.title}>Проекты</h1>
      <Button onClick={onCloseModal}>Создать проект</Button>

      <div className={styles.projects}>
        {projects.map((project) => (
          <Project title={project.title} key={project.id} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
