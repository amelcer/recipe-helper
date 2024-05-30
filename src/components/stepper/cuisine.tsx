import { Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';
import CheckboxGroup from '../checkboxGroup';


const defaultOptions = ['Śródziemnomorska', 'Wegetariańska', 'Polska', 'Chińska', 'Koreańska', 'Indyjska'];


export default function Cuisine() {
    const [selected, setSelected] = useState<CheckboxValueType[]>([])

    return (
        <>
            <Typography.Title level={3}>Na jaki typ kuchni masz ochotę? 🍜🍝</Typography.Title>
            <Typography.Text>albo dopisz swój pomysł...</Typography.Text>
            <br /><br />
            <CheckboxGroup defaultOptions={defaultOptions} onSelect={setSelected} selected={selected} />
        </>
    );
}
