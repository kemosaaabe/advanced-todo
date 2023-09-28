import React from "react";

import { addProject } from "../../store/actions/projects";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import Project from "../../components/Project";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import styles from "./styles.module.css";

const Projects = () => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const projects = useAppSelector((state) => state.projects.projects);

  const onCloseModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <div className={styles.container}>
      {visibleModal && <Modal onClose={onCloseModal}>Добавить проект</Modal>}

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
