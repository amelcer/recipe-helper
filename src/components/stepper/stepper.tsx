'use client';
import React, { useState } from 'react';
import { Button, Flex, message, StepProps, Steps } from 'antd';
import Ingredients from './ingredients';
import { GlobalOutlined, OrderedListOutlined } from '@ant-design/icons';
import Cuisine from './cuisine';
import StepperContextProvider from './context';
import Summary from './summary';

const steps: Array<StepProps & { content: React.ReactNode }> = [
  {
    title: 'Wybierz składniki',
    icon: <OrderedListOutlined />,
    content: <Ingredients />,
  },
  {
    title: 'Rodzaj kuchni',
    content: <Cuisine />,
    icon: <GlobalOutlined />,
  },
  {
    title: 'Podsumowanie',
    content: <Summary />,
  },
];

const Stepper: React.FC = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map(({ content, ...item }) => ({ key: item.title, title: item.title, ...item }));

  return (
    <StepperContextProvider>
      <Flex vertical justify="space-between" style={{ height: '100%' }} gap={2}>
        <Steps current={current} items={items} />
        <div style={{ width: '100%', padding: '2rem' }}>{steps[current].content}</div>
        <Flex justify="space-between" gap={2}>
          <Button style={{ margin: '0 8px' }} onClick={() => prev()} disabled={current === 0}>
            Wróć
          </Button>
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Dalej
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Gotuj
            </Button>
          )}
        </Flex>
      </Flex>
    </StepperContextProvider>
  );
};

export default Stepper;
