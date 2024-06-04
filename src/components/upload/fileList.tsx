import React from 'react';
import { Button, List, Popconfirm } from 'antd';
import { DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';
import { FileObject } from 'openai/resources/files.mjs';

function FileList({
  files,
  loading,
  onDeleteFile,
}: {
  files: FileObject[];
  loading: boolean;
  onDeleteFile: (id: string) => void;
}) {
  return (
    <List
      itemLayout="horizontal"
      dataSource={files}
      loading={loading}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta avatar={<FilePdfOutlined />} title={item.filename} />
          <Popconfirm
            title="Usuń plik"
            description="Czy na pewno chcesz usunąć ten plik?"
            okText="Tak"
            cancelText="Nie"
            onConfirm={() => onDeleteFile(item.id)}
          >
            <Button danger icon={<DeleteOutlined />} shape="circle" ghost size="small" />
          </Popconfirm>
        </List.Item>
      )}
    />
  );
}
export default FileList;
