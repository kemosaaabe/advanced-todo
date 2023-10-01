import React, { FC } from "react";
import { useDrag } from "react-dnd";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

import Modal from "../../ui/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Subtasks from "../Subtasks";
import Comments from "../Comments";

import { useAppDispatch } from "../../app/hooks";
import { editTask, removeTask } from "../../store/actions/tasks";
import { ITask, TaskPriority } from "../../store/types";

import styles from "./styles.module.css";
import { createPortal } from "react-dom";

interface TaskProps {
  task: ITask;
}

const Task: FC<TaskProps> = ({ task }) => {
  const editorRef = React.useRef<TinyMCEEditor | null>(null);
  const [taskTitle, setTaskTitle] = React.useState(task.title);

  const dispatch = useAppDispatch();

  const [visibleModal, setVisibleModal] = React.useState(false);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const onCloseModal = () => {
    const description = editorRef.current?.getContent();

    if (description) {
      if (!taskTitle) return;

      dispatch(
        editTask({
          ...task,
          title: taskTitle,
          description: description,
        })
      );
    }

    setVisibleModal(!visibleModal);
  };

  const onTaskDelete = (id: string) => {
    dispatch(removeTask(id));
    onCloseModal();
  };

  const onPrioritySelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const priority = target.dataset.priority as TaskPriority;

    if (!priority) return;
    if (task.priority === priority) return;

    dispatch(editTask({ ...task, priority: priority }));
  };

  return (
    <div>
      {visibleModal &&
        createPortal(
          <Modal onClose={onCloseModal}>
            <div className={styles.taskTitle}>
              <Input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.code === "Escape") onCloseModal();
                }}
              />
            </div>
            <div className={styles.manageBlock}>
              <div className={styles.col}>
                <div className={styles.block}>
                  <img src="/assets/images/file.svg" alt="file" />
                  <span className={styles.attachFile}>Прикрепить файлы</span>
                </div>
                <div className={styles.block}>
                  <img src="/assets/images/priority.svg" alt="priority" />
                  Выбрать приоритет ({task.priority}):
                  <div className={styles.priorities} onClick={onPrioritySelect}>
                    <div
                      data-priority="low"
                      className={`${styles.priorityBall} ${styles.low}`}
                    ></div>
                    <div
                      data-priority="md"
                      className={`${styles.priorityBall} ${styles.md}`}
                    ></div>
                    <div
                      data-priority="high"
                      className={`${styles.priorityBall} ${styles.high}`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className={styles.col}>
                <div className={styles.block}>
                  Дата создания: {task.created.toString()}
                </div>
                {task.finished && (
                  <div className={styles.block}>
                    Дата завершения: {task.finished.toString()}
                  </div>
                )}
                {task.workTime && (
                  <div className={styles.block}>
                    Время в работе: {task.workTime.toString()}
                  </div>
                )}
              </div>
            </div>
            <p className={styles.description}>Описание</p>
            <div className={styles.editor}>
              <Editor
                apiKey="vim3kaj5bi4pfmeln7hzdu1lus1gi5ofgfqr0nehjbd92e21"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={task.description}
                init={{
                  height: 250,
                  menubar: false,
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat",
                }}
              />
            </div>

            <Subtasks />
            <Comments />

            <Button onClick={() => onTaskDelete(task.id)}>
              Удалить задачу
            </Button>
          </Modal>,
          document.body
        )}
      <div
        ref={drag}
        data-priority={task.priority}
        className={`${styles.task} ${isDragging && styles.dragTask}`}
        onClick={onCloseModal}
      >
        {task.title}
      </div>
    </div>
  );
};

export default Task;
