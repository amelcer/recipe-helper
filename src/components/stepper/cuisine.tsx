import { Typography } from 'antd';
import CheckboxGroup from '../checkboxGroup';
import { useStepperContext } from './context';


const defaultOptions = ['Śródziemnomorska', 'Wegetariańska', 'Polska', 'Chińska', 'Koreańska', 'Indyjska'];


export default function Cuisine() {
    const { cuisine, onCuisineChange } = useStepperContext()

    return (
        <>
            <Typography.Title level={3}>Na jaki typ kuchni masz ochotę? 🍜🍝</Typography.Title>
            <Typography.Text>albo dopisz swój pomysł...</Typography.Text>
            <br /><br />
            <CheckboxGroup defaultOptions={defaultOptions} onSelect={onCuisineChange} selected={cuisine} />
        </>
    );
}
