import React, { useState } from 'react';
import { Button, Input, Checkbox, Space, List, Flex } from 'antd';
import type { GetProp } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';


type Props = {
    defaultOptions: string[]
    onSelect: (data: string[]) => void
    selected: string[]
}

export default function CheckboxGroup({ defaultOptions, onSelect, selected }: Props) {
    const [newItem, setNewItem] = useState("")
    const [item, setItem] = useState(defaultOptions)

    const handleChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
        onSelect(checkedValues as string[]);
    };

    const handleAddOption = () => {
        setItem((values) => [...values, newItem]);
        onSelect([...selected, newItem])
        setNewItem("")
    };

    const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewItem(e.target.value)
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { code } = e

        if (code === 'Enter') {
            handleAddOption()
        }
    }

    const handleSelectAll = (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            onSelect([...item])
        }
        else {
            onSelect([])
        }
    }


    return (
        <>
            <Checkbox onChange={handleSelectAll} value="" checked={selected.length === item.length} indeterminate={selected.length > 0 && selected.length !== item.length}>Zaznacz wszystko</Checkbox>
            <br />
            <Checkbox.Group value={selected} onChange={handleChange}>
                <List
                    dataSource={item}
                    grid={{ gutter: 12, column: 3 }}
                    className='ingredients-list'
                    header={<></>}
                    footer={(
                        <Space.Compact style={{ width: '100%', marginTop: "8px" }}>
                            <Input placeholder={defaultOptions[0]} value={newItem} onChange={handleIngredientChange} onKeyDown={handleKeyDown} />
                            <Button type="default" onClick={handleAddOption}>Dodaj</Button>
                        </Space.Compact>
                    )}
                    renderItem={(item) => (
                        <List.Item key={item} style={{ paddingBlock: "4px" }}>
                            <Flex justify='space-between' style={{ height: "100%" }} >
                                <Checkbox value={item}>{item}</Checkbox>
                            </Flex>
                        </List.Item>
                    )}
                />
            </Checkbox.Group>
        </>
    );
}
