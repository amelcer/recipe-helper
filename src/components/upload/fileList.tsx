import React from 'react';
import { Button, List, Popconfirm } from 'antd';
import { DeleteOutlined, FilePdfOutlined } from '@ant-design/icons';

const data = [
    {
        title: 'Przepisy Ani',
    },
    {
        title: 'Książka kucharska',
    },

];

const FileList: React.FC = () => (
    <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                    avatar={<FilePdfOutlined />}
                    title={item.title}
                />
                <Popconfirm
                    title="Delete the file"
                    description="Are you sure to delete this file?"
                    okText="Yes"
                    cancelText="No"
                >
                    <Button danger icon={<DeleteOutlined />} shape="circle" ghost size='small' />
                </Popconfirm>
            </List.Item>
        )}
    />
);

export default FileList;
