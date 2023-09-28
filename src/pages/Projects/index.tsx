import React from "react";

import Project from "../../components/Project";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

import styles from "./styles.module.css";

const Projects = () => {
  const [visibleModal, setVisibleModal] = React.useState(false);

  const onCloseModal = () => {
    setVisibleModal(!visibleModal);
  };

  return (
    <div className={styles.container}>
      {visibleModal && <Modal onClose={onCloseModal}>Добавить проект</Modal>}

      <h1 className={styles.title}>Проекты</h1>
      <Button onClick={onCloseModal}>Создать проект</Button>
      <div className={styles.projects}>
        {Array(10)
          .fill(null)
          .map((project, index) => (
            <Project key={index} />
          ))}
      </div>
    </div>
  );
};

export default Projects;
