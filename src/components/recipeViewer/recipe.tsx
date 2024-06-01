import { Button, Flex } from 'antd';
import Markdown from 'react-markdown';
import { useStepperContext } from '../stepper/context';

type Props = {
  onResetRecipe: () => void;
  recipe: string;
};

export default function Recipe({ onResetRecipe, recipe }: Props) {
  const { reset } = useStepperContext();

  const handleReset = () => {
    onResetRecipe();
    reset();
  };

  return (
    <>
      <div style={{ marginBottom: '20px', height: '90%', overflow: 'auto' }}>
        <Markdown>{recipe}</Markdown>
      </div>
      <Flex justify="flex-end" gap={2}>
        <Button type="primary" onClick={() => handleReset()}>
          Kolejny przepis
        </Button>
      </Flex>
    </>
  );
}
