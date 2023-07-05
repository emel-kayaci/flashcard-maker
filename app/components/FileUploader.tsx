import React, { ChangeEvent } from 'react';

interface FileUploaderProps {
  onFileUpload: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  return <input type="file" accept=".xlsx,.xls,.csv" onChange={onFileUpload} />;
};

export default FileUploader;
