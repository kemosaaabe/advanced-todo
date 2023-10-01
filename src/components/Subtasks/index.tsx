import Button from "../../ui/Button";

import styles from "./styles.module.css";

const Subtasks = () => {
  return (
    <div className={styles.subtasks}>
      <h3 className={styles.title}>Подзадачи</h3>
      <Button>Добавить задачу</Button>
    </div>
  );
};

export default Subtasks;
