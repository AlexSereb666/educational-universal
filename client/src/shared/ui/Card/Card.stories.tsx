import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import image from '../../assets/defaultAvatar.png';
import { Card } from './Card';

const meta = {
    title: 'shared/Card',
    component: Card,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '350px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        image: {
            control: 'text',
            description: 'URL изображения для карточки',
        },
        title: {
            control: 'text',
            description: 'Заголовок карточки',
        },
        date: {
            control: 'text',
            description: 'Дата публикации (или другая дата)',
        },
        views: {
            control: 'number',
            description: 'Количество просмотров',
        },
        types: {
            control: 'text',
            description: 'Типы или категории (через запятую, например)',
        },
        onClick: {
            action: 'clicked',
            description: 'Функция, вызываемая при клике на карточку',
        },
    },
    args: {
        image: image,
        title: 'Заголовок карточки по умолчанию',
        date: '01.01.2024',
        views: 1500,
        types: 'Технологии, Новости',
        onClick: fn(),
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LongTitle: Story = {
    args: {
        title: 'Очень-очень длинный заголовок, который должен корректно переноситься на несколько строк, если он не влезает в одну',
        types: 'Дизайн, Фронтенд, UI, UX, Длинный тег', // Тоже длинные типы
    },
};

export const NoImage: Story = {
    args: {
        image: image,
        title: 'Карточка без изображения',
    },
    parameters: {
        docs: {
            description: {
                story: 'Проверяет, как отображается карточка, если изображение не загрузилось (должен быть виден alt текст).',
            },
        },
    },
};

export const ZeroViews: Story = {
    args: {
        views: 0,
        title: 'Никто еще не смотрел',
    },
};

export const NotClickable: Story = {
    args: {
        onClick: undefined,
        title: 'Эту карточку нельзя кликнуть',
    },
};

export const RealDataExample: Story = {
    args: {
        image: image,
        title: 'Ноутбук и Код: Современная Разработка',
        date: '15.07.2024',
        views: 8743,
        types: 'Разработка, IT, Гаджеты',
        onClick: fn(),
    },
};
