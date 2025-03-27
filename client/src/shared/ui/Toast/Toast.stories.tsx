import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { ToastType } from '@/shared/const/toast';
import { Toast } from './Toast';
import { VStack } from '../Stack';

const meta = {
    title: 'shared/Toast',
    component: Toast,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <VStack
                gap="16"
                max
            >
                <Story />
            </VStack>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        title: {
            control: 'text',
            description: 'Основной текст уведомления',
        },
        type: {
            control: 'select',
            options: Object.values(ToastType),
            description: 'Тип уведомления (влияет на иконку и стиль)',
        },
        duration: {
            control: 'number',
            description: 'Длительность отображения в миллисекундах',
        },
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс',
        },
    },
    args: {
        title: 'Стандартное уведомление',
        type: ToastType.INFO,
        duration: 5000,
    },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
    args: {
        title: 'Действие выполнено успешно!',
        type: ToastType.SUCCESS,
        duration: 3000,
    },
};

export const Error: Story = {
    args: {
        title: 'Произошла ошибка',
        type: ToastType.ERROR,
        duration: 7000,
    },
};

export const Info: Story = {
    args: {
        title: 'Доступно новое обновление системы',
        type: ToastType.INFO,
    },
};

export const Warning: Story = {
    args: {
        title: 'Внимание! Осталось мало свободного места',
        type: ToastType.WARNING,
        duration: 6000,
    },
};

export const LongText: Story = {
    args: {
        title: 'Это очень-очень длинное уведомление, которое должно корректно переноситься на несколько строк, если оно не помещается в одну',
        type: ToastType.INFO,
        duration: 10000,
    },
};

export const Multiple: Story = {
    render: (args) => (
        <>
            <Toast
                title={args.title}
                type={args.type}
                duration={args.duration}
            />
            <Toast
                title="Еще одно успешное уведомление"
                type={ToastType.SUCCESS}
                duration={4000}
            />
            <Toast
                title="Какое-то предупреждение"
                type={ToastType.WARNING}
                duration={6000}
            />
            <Toast
                title="Фатальная ошибка!"
                type={ToastType.ERROR}
                duration={8000}
            />
        </>
    ),
    args: {
        title: 'Информационное сообщение',
        type: ToastType.INFO,
        duration: 5000,
    },
};
