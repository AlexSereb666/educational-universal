import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { InputContainer } from './InputContainer';

const meta = {
    title: 'shared/InputContainer',
    component: InputContainer,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Текущее значение инпута (управляемый компонент)',
        },
        onChange: {
            action: 'changed',
            description: 'Функция, вызываемая при изменении значения',
        },
        label: {
            control: 'text',
            description: 'Текст-подсказка (используется как placeholder)',
        },
        isActive: {
            control: 'boolean',
            description: 'Активен ли инпут (если false, то disabled)',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер инпута',
        },
        type: {
            control: 'text',
            description: 'Тип HTML-инпута (type атрибут)',
        },
    },
    args: {
        value: '',
        onChange: fn(),
        label: 'Введите текст...',
        isActive: true,
        size: 'medium',
        type: 'text',
    },
} satisfies Meta<typeof InputContainer>;

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
            <InputContainer
                {...args}
                value={currentValue}
                onChange={handleChange}
            />
        );
    },
    args: {},
};

export const WithValue: Story = {
    args: {
        value: 'Какой-то текст уже тут',
        label: 'Лейбл (плейсхолдер)',
    },
};

export const Password: Story = {
    render: Interactive.render,
    args: {
        type: 'password',
        label: 'Введите пароль...',
        value: '',
    },
};

export const Number: Story = {
    render: Interactive.render,
    args: {
        type: 'number',
        label: 'Введите число...',
        value: '',
    },
};

export const Disabled: Story = {
    args: {
        isActive: false,
        value: 'Нельзя изменить',
        label: 'Заблокировано',
    },
};

export const Small: Story = {
    render: Interactive.render,
    args: {
        size: 'small',
        label: 'Маленький инпут...',
        value: '',
    },
};

export const Large: Story = {
    render: Interactive.render,
    args: {
        size: 'large',
        label: 'Большой инпут...',
        value: '',
    },
};

export const NoLabel: Story = {
    render: Interactive.render,
    args: {
        label: undefined,
        value: '',
    },
};
