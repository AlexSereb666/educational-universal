import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Select, SelectOption } from './Select';

const sampleOptions: SelectOption[] = [
    { value: 'opt1', label: 'Опция 1 (Первая)' },
    { value: 'opt2', label: 'Опция 2' },
    { value: 'opt3', label: 'Опция 3 с очень длинным текстом, чтобы проверить перенос' },
    { value: 'opt4', label: 'Опция 4' },
    { value: 'disabled_opt', label: 'Опция 5 (скоро, но не сейчас)' },
];

const meta = {
    title: 'shared/Select',
    component: Select,
    parameters: {
        layout: 'centered',
        docs: { story: { inline: false, height: '300px' } },
    },
    decorators: [
        (Story) => (
            <div style={{ paddingBottom: '200px', minWidth: '250px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Текущее выбранное значение (value из SelectOption)',
        },
        options: {
            control: false,
            description: 'Массив доступных опций (SelectOption[])',
        },
        onChange: {
            action: 'changed',
            description: 'Функция, вызываемая при выборе опции',
        },
        label: {
            control: 'text',
            description: 'Текстовая метка для селекта',
        },
        placeholder: {
            control: 'text',
            description: 'Текст-подсказка, когда ничего не выбрано',
        },
        isActive: {
            control: 'boolean',
            description: 'Активен ли селект (влияет на возможность открытия)',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер селекта и его опций',
        },
        labelPosition: {
            control: 'radio',
            options: ['top', 'left'],
            description: 'Положение метки относительно селекта',
        },
        width: {
            control: 'text',
            description: 'Задает ширину контейнера селекта (например, "200px", "100%")',
        },
    },
    args: {
        options: sampleOptions,
        value: '',
        onChange: fn(),
        label: 'Выберите значение',
        placeholder: 'Не выбрано...',
        isActive: true,
        size: 'medium',
        labelPosition: 'top',
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => {
        const [currentValue, setCurrentValue] = useState(args.value || '');

        const handleChange = (newValue: string) => {
            args.onChange(newValue);
            setCurrentValue(newValue);
        };

        return (
            <Select
                {...args}
                value={currentValue}
                onChange={handleChange}
            />
        );
    },
    args: {},
};

export const Preselected: Story = {
    render: Interactive.render,
    args: {
        value: sampleOptions[2].value,
        label: 'Предвыбранное значение',
    },
};

export const Small: Story = {
    render: Interactive.render,
    args: {
        size: 'small',
        label: 'Маленький селект',
        value: '',
    },
};

export const Large: Story = {
    render: Interactive.render,
    args: {
        size: 'large',
        label: 'Большой селект',
        value: '',
    },
};

export const LabelLeft: Story = {
    render: Interactive.render,
    args: {
        label: 'Лейбл слева',
        labelPosition: 'left',
        value: '',
    },
    decorators: [
        (Story) => (
            <div style={{ paddingBottom: '200px', width: '400px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Disabled: Story = {
    args: {
        isActive: false,
        value: sampleOptions[0].value,
        label: 'Заблокированный селект',
    },
};

export const FixedWidth: Story = {
    render: Interactive.render,
    args: {
        width: '200px',
        label: 'Фиксированная ширина',
        value: '',
    },
};

export const FullWidth: Story = {
    render: Interactive.render,
    args: {
        width: '100%',
        label: 'На всю ширину',
        value: '',
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    paddingBottom: '200px',
                    width: '400px',
                    border: '1px dashed grey',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export const NoLabel: Story = {
    render: Interactive.render,
    args: {
        label: undefined,
        placeholder: 'Выберите фрукт...',
        options: [
            { value: 'apple', label: 'Яблоко' },
            { value: 'banana', label: 'Банан' },
            { value: 'orange', label: 'Апельсин' },
        ],
        value: '',
    },
};

export const EmptyOptions: Story = {
    render: Interactive.render,
    args: {
        options: [],
        placeholder: 'Нет доступных опций',
        label: 'Пустой селект',
        value: '',
    },
};
