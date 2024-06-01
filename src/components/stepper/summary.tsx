import { Switch, Typography } from 'antd';
import { useStepperContext } from './context';

export default function Summary() {
  const { canGoToShop, cuisine, ingredients, onCanGoToShopChange } = useStepperContext();

  return (
    <>
      <Typography.Title level={3}>Podsumowując twoje danie 🌮🍕🥪</Typography.Title>
      <Typography.Text>Masz ochotę na kuchnię z kategorii: {cuisine.join(', ')}</Typography.Text> <br />
      <Typography.Text>Posiadasz te składniki: {ingredients.join(', ')}</Typography.Text> <br />
      <Typography.Text>
        <Switch checked={canGoToShop} onChange={onCanGoToShopChange} size="small" /> i {!canGoToShop && 'nie'} chcesz
        pójść do sklepu po dodatkowe składniki
      </Typography.Text>
    </>
  );
}
