import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Upload } from 'antd';

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: false,
  action: (f) => {
    console.log(f)
    return ""
  },

};

const UploadButton: React.FC = () => (
  <Dragger {...props} showUploadList={false}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Choose or drag new recipe book</p>
  </Dragger>
);

export default UploadButton;
