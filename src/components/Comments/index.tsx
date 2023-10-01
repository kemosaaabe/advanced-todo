import React, { FC } from "react";

import { ITask, IComment } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addComment } from "../../store/actions/comments";

import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Comment from "./Comment";

import styles from "./styles.module.css";

interface CommentsProps {
  parentTask: ITask;
}

const Comments: FC<CommentsProps> = ({ parentTask }) => {
  const [value, setValue] = React.useState("");

  const comments = useAppSelector((state) => state.comments.comments).filter(
    (comment) => comment.taskId === parentTask.id && !comment.parentCommentId
  );

  const dispatch = useAppDispatch();

  const onCommentAdd = () => {
    if (!value) return;

    const comment: IComment = {
      id: String(new Date().getTime()),
      taskId: parentTask.id,
      title: value,
      subcomments: [],
    };

    dispatch(addComment(comment));
    setValue("");
  };

  return (
    <div className={styles.comments}>
      <h3 className={styles.title}>Комментарии</h3>
      <div className={styles.commentsInner}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") onCommentAdd();
        }}
        placeholder="Оставьте комментарий"
      />
      <div className={styles.buttonAdd}>
        <Button onClick={onCommentAdd}>Добавить комментарий</Button>
      </div>
    </div>
  );
};

export default Comments;
