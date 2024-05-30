import { Typography } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { useState } from 'react';
import CheckboxGroup from '../checkboxGroup';


const defaultOptions = ['Ser', 'Jajka', 'Szynka', 'Pierś z kurczaka', 'Salami', 'Serek wiejski', 'Ogórek', 'Cebula', 'Czerwona papryka', 'Masło', 'Czosnek', 'Boczek'];


export default function Ingredients() {
    const [selected, setSelected] = useState<CheckboxValueType[]>([])

    return (
        <>
            <Typography.Title level={3}>Zaznacz co masz w lodówce 🌮🍕🥪</Typography.Title>
            <Typography.Text>Lub dodaj brakujące składniki...</Typography.Text>
            <br /><br />
            <CheckboxGroup defaultOptions={defaultOptions} onSelect={setSelected} selected={selected} />
        </>
    );
}
