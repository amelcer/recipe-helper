import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { uploadAssistantFile } from '@/app/lib/asssistantFiles';
import { RcFile } from 'antd/es/upload';

const { Dragger } = Upload;

function UploadButton({ onFileLoaded }: { onFileLoaded: () => void }) {
  async function handleUpload(file: RcFile) {
    const form = new FormData();
    form.append('file', file);

    await uploadAssistantFile(form);
    onFileLoaded();

    return '';
  }

  return (
    <Dragger name="file" multiple={false} action={handleUpload} showUploadList={false}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">Wybierz lub przeciągnij książkę kucharską</p>
    </Dragger>
  );
}

export default UploadButton;
