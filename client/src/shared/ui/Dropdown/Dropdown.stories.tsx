import * as React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MemoryRouter } from 'react-router-dom';
import { Dropdown, DropdownItem } from './Dropdown';
import { Button } from '../Button/Button';
import defaultImg from '../../assets/defaultAvatar.png';

const sampleItems: DropdownItem[] = [
    {
        content: 'Профиль',
        onClick: fn(),
    },
    {
        content: 'Настройки',
        href: '/settings',
    },
    {
        content: 'Выйти',
        onClick: fn(),
    },
    {
        content: 'Помощь (disabled)',
        disabled: true,
        onClick: fn(),
    },
];

const meta = {
    title: 'shared/Dropdown',
    component: Dropdown,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter initialEntries={['/']}>
                <div style={{ paddingBottom: 150 }}>
                    {' '}
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
    argTypes: {
        trigger: {
            control: false,
            description: 'Элемент, при клике на который открывается дропдаун (ReactNode)',
        },
        items: {
            description: 'Массив объектов для пунктов меню (DropdownItem[])',
        },
    },
    args: {
        trigger: <Button size={'small'}>Открыть меню</Button>,
        items: sampleItems,
    },
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCustomTrigger: Story = {
    args: {
        trigger: (
            <img
                src={defaultImg}
                alt="Icon"
                style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                }}
            />
        ),
        items: [
            { content: 'Профиль', href: '/profile' },
            { content: 'Выйти', onClick: fn() },
        ],
    },
};

export const EmptyItems: Story = {
    args: {
        items: [], // Проверяем случай с пустым массивом
        trigger: <Button>Меню (пустое)</Button>,
    },
};

export const OnlyLinks: Story = {
    args: {
        items: [
            { content: 'Главная', href: '/' },
            { content: 'Статьи', href: '/articles' },
            { content: 'О нас', href: '/about' },
        ],
        trigger: <Button>Навигация</Button>,
    },
};

export const OnlyActions: Story = {
    args: {
        items: [
            { content: 'Действие 1', onClick: fn() },
            { content: 'Действие 2', onClick: fn() },
            { content: 'Действие 3 (disabled)', disabled: true, onClick: fn() },
        ],
        trigger: <Button>Действия</Button>,
    },
};
