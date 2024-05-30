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
                    title="Usuń plik"
                    description="Czy na pewno chcesz usunąć ten plik?"
                    okText="Tak"
                    cancelText="Nie"
                >
                    <Button danger icon={<DeleteOutlined />} shape="circle" ghost size='small' />
                </Popconfirm>
            </List.Item>
        )}
    />
);

export default FileList;
