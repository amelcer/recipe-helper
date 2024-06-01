import { Typography } from 'antd';
import CheckboxGroup from '../checkboxGroup';
import { useStepperContext } from './context';

const defaultOptions = [
  'Ser',
  'Jajka',
  'Szynka',
  'Pierś z kurczaka',
  'Salami',
  'Serek wiejski',
  'Ogórek',
  'Cebula',
  'Czerwona papryka',
  'Masło',
  'Czosnek',
  'Boczek',
];

export default function Ingredients() {
  const { ingredients, onIngredientsChange } = useStepperContext();

  return (
    <>
      <Typography.Title level={3}>Zaznacz co masz w lodówce 🌮🍕🥪</Typography.Title>
      <Typography.Text>Lub dodaj brakujące składniki...</Typography.Text>
      <br />
      <br />
      <CheckboxGroup defaultOptions={defaultOptions} onSelect={onIngredientsChange} selected={ingredients} />
    </>
  );
}
