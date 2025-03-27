import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Flex, FlexAlign, FlexDirection, FlexGap, FlexJustify } from './Flex';

const Box = ({
    color = 'lightblue',
    size = 50,
    children,
}: {
    color?: string;
    size?: number | string;
    children?: React.ReactNode;
}) => (
    <div
        style={{
            minWidth: size,
            minHeight: size,
            padding: 10,
            backgroundColor: color,
            border: '1px solid grey',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
        }}
    >
        {children || ''}
    </div>
);

const meta = {
    title: 'shared/Stack/Flex',
    component: Flex,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story, { args }) => (
            <div
                style={{
                    border: '2px dashed red',
                    padding: '5px',
                    minHeight: args.direction === 'column' ? '200px' : 'auto',
                    width: args.max ? '100%' : 'auto',
                    display: 'inline-block',
                }}
            >
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'radio',
            options: ['row', 'column'] satisfies FlexDirection[],
            description: 'Направление flex-элементов',
        },
        justify: {
            control: 'select',
            options: ['start', 'center', 'end', 'between'] satisfies FlexJustify[],
            description: 'Выравнивание по основной оси',
        },
        align: {
            control: 'select',
            options: ['start', 'center', 'end'] satisfies FlexAlign[],
            description: 'Выравнивание по поперечной оси',
        },
        gap: {
            control: 'select',
            options: ['4', '8', '16', '32'] satisfies FlexGap[],
            description: 'Промежуток между элементами',
        },
        max: {
            control: 'boolean',
            description: 'Занимать максимальную доступную ширину/высоту',
        },
        children: {
            control: false,
            description: 'Содержимое контейнера (ReactNode)',
        },
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс',
        },
    },
    args: {
        direction: 'row',
        justify: 'start',
        align: 'center',
        gap: '8',
        max: false,
        children: (
            <>
                <Box color="coral">1</Box>
                <Box color="lightblue">2</Box>
                <Box color="lightgreen">3</Box>
            </>
        ),
    },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Row: Story = {
    args: {
        direction: 'row',
    },
};

export const Column: Story = {
    args: {
        direction: 'column',
        align: 'start',
    },
};

export const RowJustifyStart: Story = { args: { direction: 'row', justify: 'start' } };
export const RowJustifyCenter: Story = { args: { direction: 'row', justify: 'center' } };
export const RowJustifyEnd: Story = { args: { direction: 'row', justify: 'end' } };
export const RowJustifyBetween: Story = {
    args: { direction: 'row', justify: 'between' },
};

export const RowAlignStart: Story = {
    args: {
        direction: 'row',
        align: 'start',
        children: (
            <>
                <Box size={50}>1</Box>
                <Box size={80}>2</Box>
                <Box size={40}>3</Box>
            </>
        ),
    },
};

export const RowAlignCenter: Story = {
    args: {
        direction: 'row',
        align: 'center',
        children: (
            <>
                <Box size={50}>1</Box>
                <Box size={80}>2</Box>
                <Box size={40}>3</Box>
            </>
        ),
    },
};

export const RowAlignEnd: Story = {
    args: {
        direction: 'row',
        align: 'end',
        children: (
            <>
                <Box size={50}>1</Box>
                <Box size={80}>2</Box>
                <Box size={40}>3</Box>
            </>
        ),
    },
};

export const ColJustifyStart: Story = {
    args: { direction: 'column', justify: 'start', align: 'start' },
};

export const ColJustifyCenter: Story = {
    args: { direction: 'column', justify: 'center', align: 'start' },
};

export const ColJustifyEnd: Story = {
    args: { direction: 'column', justify: 'end', align: 'start' },
};

export const ColJustifyBetween: Story = {
    args: { direction: 'column', justify: 'between', align: 'start' },
};

export const ColAlignStart: Story = { args: { direction: 'column', align: 'start' } };
export const ColAlignCenter: Story = { args: { direction: 'column', align: 'center' } };
export const ColAlignEnd: Story = { args: { direction: 'column', align: 'end' } };

export const Gap4: Story = { args: { direction: 'row', gap: '4' } };
export const Gap8: Story = { args: { direction: 'row', gap: '8' } };
export const Gap16: Story = { args: { direction: 'row', gap: '16' } };
export const Gap32: Story = { args: { direction: 'row', gap: '32' } };

export const Gap16Column: Story = {
    args: { direction: 'column', gap: '16', align: 'start' },
};

export const MaxWidth: Story = {
    args: {
        direction: 'row',
        max: true,
        justify: 'between',
    },
};

export const MaxHeight: Story = {
    args: {
        direction: 'column',
        max: true,
        justify: 'between',
        align: 'start',
    },
};
