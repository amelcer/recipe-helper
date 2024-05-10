import React, { useState } from 'react';
import { Button, Input, Checkbox, Space, List, Flex, Typography } from 'antd';
import type { GetProp } from 'antd';
import { CheckboxValueType } from 'antd/es/checkbox/Group';
import { DeleteOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/es/checkbox';


const defaultOptions = ['Cheese', 'Eggs', 'Ham', 'Chicken breast', 'Salami', 'Cottage cheese', 'Cucumber', 'Onion', 'Red pepper', 'Butter', 'Garlic', 'Bacon'];


export default function Ingredients() {
    const [ingredient, setIngredient] = useState("")
    const [ingredients, setIngredients] = useState(defaultOptions)
    const [selected, setSelected] = useState<CheckboxValueType[]>([])

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        setSelected(checkedValues);
    };

    const handleRemove = (option: string) => {
        setIngredients((values) => values.filter(v => v !== option));
    };

    const handleAddOption = () => {
        setIngredients((values) => [...values, ingredient]);
        setSelected(s => [...s, ingredient])
        setIngredient("")
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIngredient(e.target.value)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { code } = e

        if (code === 'Enter') {
            handleAddOption()
        }
    }

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setSelected([...ingredients])
        }
        else {
            setSelected([])
        }
    }


    return (
        <>
            <Typography.Title level={3}>Choose what's in your fridge🌮🍕🥪</Typography.Title>
            <Typography.Text>You can add something if it is missing...</Typography.Text>
            <br /><br />
            <Checkbox onChange={handleSelectAll} value="" checked={selected.length === ingredients.length} indeterminate={selected.length > 0 && selected.length !== ingredients.length}>Select all</Checkbox>
            <Checkbox.Group value={selected} onChange={handleChange}>
                <List
                    dataSource={ingredients}
                    grid={{ gutter: 12, column: 3 }}
                    className='ingredients-list'
                    header={<></>}
                    footer={(
                        <Space.Compact style={{ width: '100%', marginTop: "8px" }}>
                            <Input placeholder='Add ingredient' value={ingredient} onChange={handleIngredientChange} onKeyDown={handleKeyDown} />
                            <Button type="default" onClick={handleAddOption}>Add</Button>
                        </Space.Compact>
                    )}
                    renderItem={(item) => (
                        <List.Item key={item} style={{ paddingBlock: "4px" }}>
                            <Flex justify='space-between' style={{ height: "100%" }} >
                                <Checkbox value={item}>{item}</Checkbox>
                                <Button danger icon={<DeleteOutlined />} onClick={() => handleRemove(item)} shape="circle" ghost size='small' />
                            </Flex>
                        </List.Item>
                    )}
                />
            </Checkbox.Group>
        </>
    );
}
