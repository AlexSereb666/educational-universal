import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';
import { VStack } from '../Stack';
import image from '../../assets/defaultAvatar.png';

const meta = {
    title: 'shared/Popover',
    component: Popover,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '150px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        trigger: {
            control: false,
            description: 'Элемент, при клике на который открывается поповер (ReactNode)',
        },
    },
    args: {
        trigger: <Button>Нажми меня (Default)</Button>,
        children: <></>,
    },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        trigger: <Button>Нажми меня</Button>,
    },
    render: (args) => (
        <Popover trigger={args.trigger}>
            <VStack gap="8">
                <Text>Содержимое поповера</Text>
                <Text size="small">Здесь может быть что угодно</Text>
            </VStack>
        </Popover>
    ),
};

export const TextTrigger: Story = {
    args: {
        trigger: <Text>Кликни по тексту</Text>,
    },
    render: (args) => (
        <Popover trigger={args.trigger}>
            <Text>Всплывашка от текста!</Text>
        </Popover>
    ),
};

export const ComplexContent: Story = {
    args: {
        trigger: <Button>Открыть сложное меню</Button>,
    },
    render: (args) => (
        <Popover trigger={args.trigger}>
            <VStack gap="16">
                <Text bold>Настройки</Text>
                <Button size="small">Профиль</Button>
                <Button size="small">Уведомления</Button>
                <hr
                    style={{ width: '100%', border: 'none', borderTop: '1px solid #ccc' }}
                />
                <Button size="small">Выйти</Button>
            </VStack>
        </Popover>
    ),
};

export const MultiplePopovers: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '50px' }}>
            <Popover trigger={<Button>Первый поповер</Button>}>
                <Text>Контент первого</Text>
            </Popover>
            <Popover trigger={<Button>Второй поповер</Button>}>
                <Text>Контент второго</Text>
            </Popover>
            <Popover trigger={<Button>Третий</Button>}>
                <VStack gap="8">
                    <Text>Третий самый важный</Text>
                    <img
                        src={image}
                        alt="placeholder"
                        style={{ width: 50, height: 50 }}
                    />
                </VStack>
            </Popover>
        </div>
    ),
};
