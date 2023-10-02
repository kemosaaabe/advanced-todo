import React, { FC } from "react";

import styles from "./styles.module.css";

interface UploaderProps {
  onUploadComplete: (files: string[]) => void;
}

const Uploader: FC<UploaderProps> = ({ onUploadComplete }) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const newFiles = [...selectedFiles, ...Array.from(files)];
      setSelectedFiles(newFiles);

      const fileNames = newFiles.map((file) => file.name);

      onUploadComplete(fileNames);
    }
  };

  return (
    <div className={styles.uploader}>
      <div className={styles.uploaderInner}>
        <img src="assets/images/file.svg" alt="file" />
        <label htmlFor="upload" className={styles.attachFile}>
          Прикрепить файлы
        </label>
        <input type="file" id="upload" multiple onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default Uploader;
