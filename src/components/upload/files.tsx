import UploadButton from './uploadButton';
import FileList from './fileList';
import { deleteAssistantFile, getAssistantFiles } from '@/app/lib/asssistantFiles';
import { useEffect, useState } from 'react';
import { FileObject } from 'openai/resources/files.mjs';

export default function Files() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const handleLoadFiles = () => {
    setLoading(true);
    getAssistantFiles().then((response) => {
      setFiles(response);
      setLoading(false);
    });
  };

  const handleDeleteFile = (id: string) => {
    deleteAssistantFile(id);
    handleLoadFiles();
  };

  useEffect(() => {
    handleLoadFiles();
  }, []);

  return (
    <>
      <FileList files={files} loading={loading} onDeleteFile={handleDeleteFile} />
      <div>
        <UploadButton onFileLoaded={handleLoadFiles} />
      </div>
    </>
  );
}
