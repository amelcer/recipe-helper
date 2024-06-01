'use client';
import React, { useState } from 'react';
import { Button, Flex, Spin, StepProps, Steps, message } from 'antd';
import Ingredients from './ingredients';
import { GlobalOutlined, OrderedListOutlined } from '@ant-design/icons';
import Cuisine from './cuisine';
import { useStepperContext } from './context';
import Summary from './summary';
import { getRecipe } from '@/app/actions';

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

type Props = {
  onRecipeReceived: (recipe: string) => void;
};

const Stepper = ({ onRecipeReceived }: Props) => {
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const { ingredients, canGoToShop, cuisine, nextPage, page, prevPage } = useStepperContext();

  const handleGetRecipe = async () => {
    setState('loading');

    try {
      const response = await getRecipe({ ingredients, canGoToShop, cuisine });

      onRecipeReceived(response);
      setState('idle');
    } catch (e) {
      console.log(e);

      setState('error');
      message.error('Nie udało się wygenerować przepisu');
    }
  };

  const items = steps.map(({ content, ...item }) => ({ key: item.title, title: item.title, ...item }));

  return (
    <Flex vertical justify="space-between" style={{ height: '100%' }} gap={2}>
      <Steps current={page} items={items} />
      {state === 'error' ? (
        <>
          Coś poszło nie tak <Button onClick={() => window.location.reload()}>Spróbuj ponownie</Button>
        </>
      ) : (
        <>
          <div style={{ width: '100%', padding: '2rem' }}>
            {state === 'idle' && steps[page].content}
            {state === 'loading' && <Spin style={{ width: '100%', margin: '0 auto' }} />}
          </div>
          <Flex justify="space-between" gap={2}>
            <Button style={{ margin: '0 8px' }} onClick={() => prevPage()} disabled={page === 0 || state === 'loading'}>
              Wróć
            </Button>
            {page < steps.length - 1 && (
              <Button type="primary" onClick={() => nextPage()}>
                Dalej
              </Button>
            )}
            {page === steps.length - 1 && (
              <Button type="primary" disabled={state === 'loading'} onClick={() => handleGetRecipe()}>
                Gotuj
              </Button>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default Stepper;
