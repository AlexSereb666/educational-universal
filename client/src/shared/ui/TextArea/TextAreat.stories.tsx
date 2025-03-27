import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { TextArea } from './TextArea';

const meta = {
    title: 'shared/TextArea',
    component: TextArea,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Текст-подсказка (плейсхолдер)',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер текстовой области',
        },
        value: {
            control: 'text',
            description: 'Текущее значение текстовой области (управляемый компонент)',
        },
        onChange: {
            action: 'changed',
            description: 'Функция, вызываемая при изменении значения',
        },
        disabled: {
            control: 'boolean',
            description: 'Блокирует текстовую область',
        },
        resizable: {
            control: 'boolean',
            description: 'Разрешает/запрещает изменение размера пользователем',
        },
    },
    args: {
        value: '',
        onChange: fn(),
        placeholder: 'Введите текст здесь...',
        size: 'medium',
        disabled: false,
        resizable: true,
    },
} satisfies Meta<typeof TextArea>;

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
            <TextArea
                {...args}
                value={currentValue}
                onChange={handleChange}
            />
        );
    },
    args: {
        size: 'small',
        value: 'Начальный текст для интерактивного примера.',
    },
};

export const Small: Story = {
    render: Interactive.render,
    args: {
        size: 'small',
        placeholder: 'Маленькая область...',
        value: '',
    },
};

export const Large: Story = {
    render: Interactive.render,
    args: {
        size: 'large',
        placeholder: 'Большая область...',
        value: '',
    },
};

export const NonResizable: Story = {
    render: Interactive.render,
    args: {
        resizable: false,
        placeholder: 'Нельзя изменить размер...',
        value: '',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        value: 'Это значение нельзя изменить',
        placeholder: 'Заблокировано',
    },
};

export const WithPlaceholderOnly: Story = {
    render: Interactive.render,
    args: {
        value: '',
        placeholder: 'Здесь мог бы быть ваш текст...',
    },
};
