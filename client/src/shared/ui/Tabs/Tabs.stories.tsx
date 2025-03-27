import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Tabs, TabItem } from './Tabs';

const sampleTabs: TabItem[] = [
    { value: 'tab1', content: 'Вкладка 1' },
    { value: 'tab2', content: 'Вкладка 2' },
    { value: 'tab3', content: 'Очень Длинное Название Вкладки 3' },
    { value: 4, content: 'Вкладка 4 (число)' },
    { value: 'tab5', content: 'Вкладка 5' },
    { value: 'tab6', content: 'Вкладка 6' },
];

const meta = {
    title: 'shared/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        tabs: {
            control: false,
            description: 'Массив объектов вкладок (TabItem[])',
        },
        value: {
            control: 'text',
            description: 'Текущее выбранное значение вкладки (value из TabItem)',
        },
        onTabClick: {
            action: 'tabClicked',
            description: 'Функция, вызываемая при клике на вкладку',
        },
        maxElements: {
            control: 'number',
            description: 'Максимальное количество отображаемых вкладок',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер вкладок',
        },
        equalWidth: {
            control: 'boolean',
            description:
                'Равномерное распределение ширины между вкладками (для горизонтальной ориентации)',
        },
        orientation: {
            control: 'radio',
            options: ['horizontal', 'vertical'],
            description: 'Ориентация вкладок',
        },
    },
    args: {
        tabs: sampleTabs,
        value: sampleTabs[0].value,
        onTabClick: fn(),
        size: 'medium',
        orientation: 'horizontal',
        equalWidth: false,
        maxElements: 10,
    },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => {
        const [currentValue, setCurrentValue] = useState(args.value);

        const handleTabClick = (tab: TabItem) => {
            args.onTabClick(tab);
            setCurrentValue(tab.value);
        };

        return (
            <Tabs
                {...args}
                value={currentValue}
                onTabClick={handleTabClick}
            />
        );
    },
    args: {},
};

export const Vertical: Story = {
    render: Interactive.render,
    args: {
        orientation: 'vertical',
    },
    parameters: {
        layout: 'padded',
    },
};

export const SmallSize: Story = {
    render: Interactive.render,
    args: {
        size: 'small',
    },
};

export const LargeSize: Story = {
    render: Interactive.render,
    args: {
        size: 'large',
    },
};

export const EqualWidth: Story = {
    render: Interactive.render,
    args: {
        equalWidth: true,
        orientation: 'horizontal',
    },
};

export const LimitedTabs: Story = {
    render: Interactive.render,
    args: {
        tabs: sampleTabs,
        maxElements: 3,
        value: sampleTabs[0].value,
    },
};

export const Empty: Story = {
    args: {
        tabs: [],
        value: '',
    },
};
