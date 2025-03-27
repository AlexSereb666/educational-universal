import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from './Button';

const meta = {
    title: 'shared/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер кнопки',
        },
        disabled: {
            control: 'boolean',
            description: 'Делает кнопку неактивной',
        },
        children: {
            control: 'text',
            description: 'Содержимое кнопки (обычно текст)',
        },
        onClick: {
            action: 'clicked',
            description: 'Функция обработчика клика',
        },
    },
    args: {
        children: 'Текст Кнопки',
        disabled: false,
        size: 'medium',
        onClick: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: 'Обычная кнопка',
    },
};

export const Large: Story = {
    args: {
        size: 'large',
        children: 'Большая кнопка',
    },
};

export const Medium: Story = {
    args: {
        size: 'medium',
        children: 'Средняя кнопка',
    },
};

export const Small: Story = {
    args: {
        size: 'small',
        children: 'Маленькая кнопка',
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        children: 'Заблокированная кнопка',
    },
};
