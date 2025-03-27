import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StarRating } from './StarRating';
import { VStack } from '../Stack';
import { Button } from '../Button/Button';

const meta = {
    title: 'shared/StarRating',
    component: StarRating,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        size: {
            control: { type: 'range', min: 15, max: 60, step: 5 },
            description: 'Размер иконок звезд (в пикселях)',
        },
        selectedStars: {
            control: { type: 'number', min: 0, max: 5, step: 1 },
            description: 'Количество выбранных звезд (для инициализации)',
        },
        onSelect: {
            action: 'selected',
            description:
                'Функция, вызываемая при выборе рейтинга (возвращает количество звезд)',
        },
    },
    args: {
        size: 30,
        selectedStars: 0,
        onSelect: fn(),
    },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => {
        const [rating, setRating] = useState(args.selectedStars || 0);

        const handleSelect = (starsCount: number) => {
            args.onSelect(starsCount);
            setRating(starsCount);
        };

        const handleReset = () => {
            setRating(0);
        };

        return (
            <VStack
                gap="16"
                align="center"
            >
                <StarRating
                    {...args}
                    selectedStars={rating}
                    onSelect={handleSelect}
                    key={rating}
                />
                <Button
                    onClick={handleReset}
                    disabled={rating === 0}
                    size="small"
                >
                    Сбросить выбор
                </Button>
            </VStack>
        );
    },
    args: {
        selectedStars: 0,
    },
};

export const Preselected3Stars: Story = {
    args: {
        selectedStars: 3,
    },
};

export const Preselected0Stars: Story = {
    args: {
        selectedStars: 0,
    },
};

export const SmallSize: Story = {
    args: {
        size: 20,
        selectedStars: 4,
    },
};

export const LargeSize: Story = {
    args: {
        size: 50,
        selectedStars: 2,
    },
};

export const ReadOnly: Story = {
    args: {
        selectedStars: 4,
        onSelect: undefined,
    },
    parameters: {
        docs: {
            description: {
                story: 'Пример только для отображения рейтинга. Клик не обрабатывается (onSelect не передан).',
            },
        },
    },
};
