import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Input } from './Input';

const meta = {
    title: 'shared/Input',
    component: Input,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ minWidth: '250px', paddingTop: '20px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        value: {
            control: 'text',
            description: 'Текущее значение инпута',
        },
        onChange: {
            action: 'changed',
            description: 'Функция, вызываемая при изменении значения',
        },
        label: {
            control: 'text',
            description: 'Текст метки (плавающий)',
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
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс для контейнера',
        },
    },
    args: {
        value: '',
        onChange: fn(),
        label: 'Ваш текст',
        isActive: true,
        size: 'medium',
        type: 'text',
    },
} satisfies Meta<typeof Input>;

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
            <Input
                {...args}
                value={currentValue}
                onChange={handleChange}
            />
        );
    },
    args: {
        label: 'Плавающая метка',
    },
};

export const WithValue: Story = {
    args: {
        value: 'Уже что-то введено',
        label: 'Лейбл',
    },
};

export const Password: Story = {
    render: Interactive.render,
    args: {
        type: 'password',
        label: 'Пароль',
        value: '',
    },
};

export const Number: Story = {
    render: Interactive.render,
    args: {
        type: 'number',
        label: 'Количество',
        value: '',
    },
};

export const Disabled: Story = {
    args: {
        isActive: false,
        value: 'Заблокировано',
        label: 'Неактивный лейбл',
    },
};

export const Small: Story = {
    render: Interactive.render,
    args: {
        size: 'small',
        label: 'Маленький инпут',
        value: '',
    },
};

export const Large: Story = {
    render: Interactive.render,
    args: {
        size: 'large',
        label: 'Большой инпут',
        value: '',
    },
};

export const NoLabel: Story = {
    render: Interactive.render,
    args: {
        label: undefined, // или ''
        value: '',
    },
    parameters: {
        docs: {
            description: {
                story: 'Инпут без метки. Эффект плавающего лейбла здесь не применим',
            },
        },
    },
};
