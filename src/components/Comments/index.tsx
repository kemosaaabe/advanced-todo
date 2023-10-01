import React from "react";

import Input from "../../ui/Input";

import styles from "./styles.module.css";

const Comments = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className={styles.comments}>
      <h3 className={styles.title}>Комментарии</h3>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Оставьте комментарий"
      />
    </div>
  );
};

export default Comments;
