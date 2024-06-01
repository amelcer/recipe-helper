'use client';

import { Flex, Layout, theme } from 'antd';
import React from 'react';
import UploadButton from '../components/upload/uploadButton';
import FileList from '../components/upload/fileList';
import Stepper from '../components/stepper/stepper';

const { Content, Sider } = Layout;

export default function App() {
  const {
    token: { colorBgContainer, borderRadiusLG, boxShadow, blue1, padding },
  } = theme.useToken();

  return (
    <Layout style={{ height: '100vh', padding: '10rem' }}>
      <Flex style={{ width: '100%', boxShadow, borderRadius: borderRadiusLG }}>
        <Sider width={'30%'} style={{ borderRadius: `${borderRadiusLG}px 0 0 ${borderRadiusLG}px`, background: blue1 }}>
          <Flex vertical justify="space-between" style={{ height: '100%', padding }} gap={2}>
            <FileList />
            <div>
              <UploadButton />
            </div>
          </Flex>
        </Sider>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: `0 ${borderRadiusLG}px ${borderRadiusLG}px 0`,
          }}
        >
          <Stepper />
        </Content>
      </Flex>
    </Layout>
  );
}
