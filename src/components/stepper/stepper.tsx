'use client'
import React, { useState } from 'react';
import { Button, Flex, message, Steps } from 'antd';

const steps = [
    {
        title: 'First',
        content: 'First-content',
    },
    {
        title: 'Second',
        content: 'Second-content',
    },
    {
        title: 'Last',
        content: 'Last-content',
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

    const items = steps.map((item) => ({ key: item.title, title: item.title }));


    return (
        <Flex vertical justify='space-between' style={{ height: '100%', }} gap={2}>
            <Steps current={current} items={items} />
            <div style={{ height: "100%" }}>
                {steps[current].content}
            </div>
            <Flex justify='space-between' gap={2}>
                <Button style={{ margin: '0 8px' }} onClick={() => prev()} disabled={current === 0}>
                    Previous
                </Button>
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </Flex>
        </Flex>
    );
};

export default Stepper;
