import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Modal } from './Modal';
import { Button } from '../Button/Button';
import { Text } from '../Text/Text';

const meta = {
    title: 'shared/Modal',
    component: Modal,
    tags: ['autodocs'],
    argTypes: {
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс для области контента модалки',
        },
        children: {
            control: false,
            description: 'Содержимое модального окна (ReactNode)',
        },
        isOpen: {
            description:
                'Определяет, открыто ли модальное окно (управляется интерактивно в примере)',
        },
        onClose: {
            action: 'closed',
            description:
                'Функция, вызываемая при запросе на закрытие (клик по оверлею, Esc)',
        },
        lazy: {
            control: 'boolean',
            description: 'Ленивая загрузка (монтирование только при первом открытии)',
        },
    },
    args: {
        onClose: fn(),
        lazy: false,
        children: (
            <>
                <Text
                    size="large"
                    bold
                >
                    Заголовок Модалки
                </Text>
                <br />
                <Text>
                    Основное содержимое. Нажмите Esc или кликните на темный фон, чтобы
                    закрыть
                </Text>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={fn(() => console.log('OK clicked'))}>Ок</Button>
                </div>
            </>
        ),
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => {
        const [isModalOpen, setIsModalOpen] = useState(false);

        const handleOpen = () => setIsModalOpen(true);
        const handleClose = () => {
            args.onClose();
            setIsModalOpen(false);
        };

        return (
            <>
                <Button onClick={handleOpen}>Открыть Модальное Окно</Button>
                <Modal
                    {...args}
                    isOpen={isModalOpen}
                    onClose={handleClose}
                >
                    {args.children}
                </Modal>
            </>
        );
    },
    args: {},
};

export const WithLongContent: Story = {
    render: Interactive.render,
    args: {
        ...meta.args,
        children: (
            <>
                <Text
                    size="large"
                    bold
                >
                    Модалка с Длинным Контентом
                </Text>
                <br />
                {[...Array(20)].map((_, i) => (
                    <Text key={i}>
                        Строка контента. Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Nullam pulvinar risus non risus consectetur
                        venenatis. Pellentesque sit amet hendrerit risus, sed porttitor
                        quam.
                    </Text>
                ))}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={fn(() => console.log('Close clicked'))}>
                        Закрыть
                    </Button>
                </div>
            </>
        ),
    },
};
