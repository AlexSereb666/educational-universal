import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { ProgressBar } from './ProgressBar';

const meta = {
    title: 'shared/ProgressBar',
    component: ProgressBar,
    parameters: {
        layout: 'centered',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        progress: {
            control: { type: 'range', min: 0, max: 100, step: 1 },
            description: 'Процент выполнения (от 0 до 100)',
        },
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс',
        },
    },
    args: {
        progress: 50,
    },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Progress0: Story = {
    args: {
        progress: 0,
    },
};

export const Progress25: Story = {
    args: {
        progress: 25,
    },
};

export const Progress50: Story = {
    args: {
        progress: 50,
    },
};

export const Progress75: Story = {
    args: {
        progress: 75,
    },
};

export const Progress100: Story = {
    args: {
        progress: 100,
    },
};
