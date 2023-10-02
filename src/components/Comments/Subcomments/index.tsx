import { FC } from "react";

import { useAppSelector } from "../../../app/hooks";

import Comment from "../Comment";

import styles from "./styles.module.css";

interface SubcommentsProps {
  parentComment: string;
}

const Subcomments: FC<SubcommentsProps> = ({ parentComment }) => {
  const comments = useAppSelector((state) => state.comments.comments).filter(
    (comment) => comment.parentCommentId === parentComment
  );

  return (
    <div className={styles.subcomments}>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default Subcomments;
