import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
    title: 'shared/Text',
    component: Text,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Содержимое текста',
        },
        size: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер текста',
        },
        bold: {
            control: 'boolean',
            description: 'Делает текст жирным',
        },
        className: {
            control: 'text',
            description: 'Дополнительное CSS-имя класса',
        },
    },
    args: {
        children: 'Какой-то текстовый контент',
        size: 'medium',
        bold: false,
    },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Обычный (Средний) Текст',
        size: 'medium',
    },
};

export const Small: Story = {
    args: {
        children: 'Маленький Текст',
        size: 'small',
    },
};

export const Large: Story = {
    args: {
        children: 'Большой Текст',
        size: 'large',
    },
};

export const Bold: Story = {
    args: {
        children: 'Жирный Средний Текст',
        size: 'medium',
        bold: true,
    },
};

export const SmallBold: Story = {
    args: {
        children: 'Жирный Маленький Текст',
        size: 'small',
        bold: true,
    },
};

export const LargeBold: Story = {
    args: {
        children: 'Жирный Большой Текст',
        size: 'large',
        bold: true,
    },
};
