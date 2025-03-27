import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { AppImage } from './AppImage';
import { Skeleton } from '../Skeleton/Skeleton';
import { Text } from '../Text';
import { Icon } from '../Icon';
import ErrorIcon from '@/shared/assets/icons/BxsErrorCircle.svg';
import image from '@/shared/assets/defaultAvatar.png';

const successImage = image;
const errorImage = 'https://non-existent-domain.xyz/image.jpg';
const slowImage =
    'https://deelay.me/5000/https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80';

const LoadingFallback = (
    <Skeleton
        width="100%"
        height={150}
        border="8px"
    />
);

const ErrorFallback = (
    <div
        style={{
            width: '100%',
            height: 150,
            border: '2px dashed red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: '8px',
        }}
    >
        <Icon
            Svg={ErrorIcon}
            width={30}
            height={30}
        />
        <Text>Ошибка загрузки</Text>
    </div>
);

const meta = {
    title: 'shared/AppImage',
    component: AppImage,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px', height: '150px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        src: {
            control: 'text',
            description: 'URL изображения',
        },
        alt: {
            control: 'text',
            description: 'Альтернативный текст для изображения (атрибут alt)',
        },
        fallback: {
            control: false,
            description: 'Компонент, отображаемый во время загрузки (ReactElement)',
        },
        errorFallback: {
            control: false,
            description: 'Компонент, отображаемый при ошибке загрузки (ReactElement)',
        },
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс для тега <img>',
        },
    },
    args: {
        src: successImage,
        alt: 'Пример изображения',
        fallback: LoadingFallback,
        errorFallback: ErrorFallback,
    },
} satisfies Meta<typeof AppImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        src: successImage,
    },
};

export const LoadingError: Story = {
    args: {
        src: errorImage,
    },
};

export const SlowLoading: Story = {
    args: {
        src: slowImage,
    },
    parameters: {
        docs: {
            description: {
                story: 'Использует сервис задержки deelay. Вы увидите скелетон примерно на 5 секунд',
            },
        },
    },
};

export const NoLoadingFallback: Story = {
    args: {
        src: slowImage,
        fallback: undefined,
        errorFallback: ErrorFallback,
    },
    parameters: {
        docs: {
            description: {
                story: 'Во время загрузки ничего не отображается (или стандартное поведение браузера)',
            },
        },
    },
};

export const NoErrorFallback: Story = {
    args: {
        src: errorImage,
        fallback: LoadingFallback,
        errorFallback: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: 'При ошибке ничего не отображается (или стандартное поведение браузера с иконкой битого изображения)',
            },
        },
    },
};

export const NoFallbacks: Story = {
    args: {
        src: errorImage, // Попробуем с ошибкой
        fallback: undefined,
        errorFallback: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: 'Стандартное поведение тега <img> при загрузке и ошибке.',
            },
        },
    },
};

export const CustomFallbacks: Story = {
    args: {
        src: errorImage,
        fallback: (
            <div
                style={{
                    background: 'lightgray',
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                Загрузка...
            </div>
        ),
        errorFallback: (
            <div
                style={{
                    background: 'pink',
                    width: '100%',
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                Ой, ошибка!
            </div>
        ),
    },
};

export const InteractiveSrc: Story = {
    args: {
        src: successImage,
    },
};
