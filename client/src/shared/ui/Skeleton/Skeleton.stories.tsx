import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';
import { VStack, HStack } from '../Stack';

const meta = {
    title: 'shared/Skeleton',
    component: Skeleton,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        width: {
            control: 'text',
            description: 'Ширина скелетона (например, "100px", "50%", 200)',
        },
        height: {
            control: 'text',
            description: 'Высота скелетона (например, "20px", 100)',
        },
        border: {
            control: 'text',
            description: 'Радиус скругления углов (borderRadius, например, "8px", "50%")',
        },
    },
    args: {
        width: '100%',
        height: 20,
        border: '4px',
    },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Circle: Story = {
    args: {
        width: 100,
        height: 100,
        border: '50%',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export const Rectangle: Story = {
    args: {
        width: 200,
        height: 100,
        border: '8px',
    },
    decorators: [
        (Story) => (
            <div style={{ padding: '10px' }}>
                <Story />
            </div>
        ),
    ],
};

export const FixedWidth: Story = {
    args: {
        width: '300px',
        height: 16,
    },
};

export const CardExample: Story = {
    render: (args) => (
        <VStack
            gap="16"
            max
        >
            <HStack
                gap="16"
                align="center"
            >
                <Skeleton
                    width={50}
                    height={50}
                    border="50%"
                />
                <VStack
                    gap="8"
                    max
                >
                    <Skeleton
                        width="50%"
                        height={args.height}
                        border={args.border}
                    />
                    <Skeleton
                        width="80%"
                        height={args.height}
                        border={args.border}
                    />
                </VStack>
            </HStack>
            <VStack
                gap="8"
                max
            >
                <Skeleton
                    width="100%"
                    height={args.height}
                    border={args.border}
                />
                <Skeleton
                    width="100%"
                    height={args.height}
                    border={args.border}
                />
                <Skeleton
                    width="70%"
                    height={args.height}
                    border={args.border}
                />
            </VStack>
        </VStack>
    ),
    args: {
        height: 16,
        border: '4px',
    },
};

export const ListExample: Story = {
    render: (args) => (
        <VStack
            gap="16"
            max
        >
            {[...Array(3)].map((_, index) => (
                <HStack
                    key={index}
                    gap="16"
                    align="center"
                    max
                >
                    <Skeleton
                        width={40}
                        height={40}
                        border="8px"
                    />
                    <VStack
                        gap="8"
                        max
                    >
                        <Skeleton
                            width="40%"
                            height={args.height}
                            border={args.border}
                        />
                        <Skeleton
                            width="90%"
                            height={args.height}
                            border={args.border}
                        />
                    </VStack>
                </HStack>
            ))}
        </VStack>
    ),
    args: {
        height: 12,
        border: '4px',
    },
};
