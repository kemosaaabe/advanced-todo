import React, { FC } from "react";
import { createPortal } from "react-dom";

import {
  addComment,
  editComment,
  removeComment,
} from "../../../store/actions/comments";
import { useAppDispatch } from "../../../app/hooks";
import { IComment } from "../../../store/types";

import Modal from "../../../ui/Modal";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";

import styles from "./styles.module.css";
import Subcomments from "../../Subcomments";

interface CommentProps {
  comment: IComment;
}

const Comment: FC<CommentProps> = ({ comment }) => {
  const [visibleModal, setVisibleModal] = React.useState(false);
  const [value, setValue] = React.useState("");

  const dispatch = useAppDispatch();

  const onCloseModal = () => {
    setVisibleModal(!visibleModal);
  };

  const onCommentAdd = () => {
    if (!value) return;

    const newComment: IComment = {
      id: String(new Date().getTime()),
      title: value,
      taskId: comment.taskId,
      parentCommentId: comment.id,
      subcomments: [],
    };

    dispatch(
      editComment({
        ...comment,
        subcomments: [...comment.subcomments, newComment],
      })
    );

    dispatch(addComment(newComment));

    setValue("");
  };

  const onCommentDelete = (id: string) => {
    dispatch(removeComment(id));

    if (comment.subcomments.length > 0) {
      comment.subcomments.forEach((comment) =>
        dispatch(removeComment(comment.id))
      );
    }
  };

  return (
    <div className={styles.comment}>
      {visibleModal &&
        createPortal(
          <Modal onClose={onCloseModal}>
            <h2 className={styles.titleModal}>Ответить на комментарий</h2>
            <Input
              value={value}
              placeholder="Комментарий..."
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onCommentAdd();
                }
              }}
            />
            <div className={styles.buttonAdd}>
              <Button onClick={onCommentAdd}>Ответить</Button>
            </div>
          </Modal>,
          document.body
        )}
      <span className={styles.commentText}>
        {comment.title}
        <img
          src="/assets/images/trash.svg"
          alt="remove"
          onClick={() => onCommentDelete(comment.id)}
        />
      </span>
      <p className={styles.commentResponse}>
        <span onClick={onCloseModal}>Ответить</span>
      </p>
      {comment.subcomments.length > 0 ? (
        <Subcomments parentComment={comment.id} />
      ) : null}
    </div>
  );
};

export default Comment;
