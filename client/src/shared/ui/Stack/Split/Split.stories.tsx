import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Split, SplitRatio } from './Split';
import { FlexGap } from '../Flex/Flex';

const Box = ({
    color = 'lightblue',
    children,
    style,
}: {
    color?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
}) => (
    <div
        style={{
            padding: 20,
            backgroundColor: color,
            border: '1px solid grey',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxSizing: 'border-box',
            ...style,
        }}
    >
        {children || ''}
    </div>
);

const gapOptions: FlexGap[] = ['4', '8', '16', '32'];
const ratioOptions: SplitRatio[] = ['1:1', '2:1', '3:1', '4:1', '1:2', '1:3', '1:4'];

const meta = {
    title: 'shared/Stack/Split',
    component: Split,
    parameters: {
        layout: 'padded',
    },
    decorators: [
        (Story) => (
            <div style={{ border: '2px dashed darkorchid', padding: '5px' }}>
                <Story />
            </div>
        ),
    ],
    tags: ['autodocs'],
    argTypes: {
        ratio: {
            control: 'select',
            options: ratioOptions,
            description: 'Соотношение ширины левой и правой части',
        },
        gap: {
            control: 'select',
            options: gapOptions,
            description: 'Промежуток между частями',
        },
        children: {
            control: false,
            description: 'Два дочерних элемента (ReactNode[2])',
        },
        className: {
            control: 'text',
            description: 'Дополнительный CSS-класс',
        },
    },
    args: {
        ratio: '1:1',
        gap: '16',
        children: [
            <Box
                key="left"
                color="coral"
            >
                Левая часть (1)
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                Правая часть (1)
            </Box>,
        ],
    },
} satisfies Meta<typeof Split>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ratio1_1: Story = {
    args: {
        ratio: '1:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                1
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                1
            </Box>,
        ],
    },
};

export const Ratio2_1: Story = {
    args: {
        ratio: '2:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                2
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                1
            </Box>,
        ],
    },
};

export const Ratio3_1: Story = {
    args: {
        ratio: '3:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                3
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                1
            </Box>,
        ],
    },
};

export const Ratio4_1: Story = {
    args: {
        ratio: '4:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                4
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                1
            </Box>,
        ],
    },
};

export const Ratio1_2: Story = {
    args: {
        ratio: '1:2',
        children: [
            <Box
                key="left"
                color="coral"
            >
                1
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                2
            </Box>,
        ],
    },
};

export const Ratio1_3: Story = {
    args: {
        ratio: '1:3',
        children: [
            <Box
                key="left"
                color="coral"
            >
                1
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                3
            </Box>,
        ],
    },
};

export const Ratio1_4: Story = {
    args: {
        ratio: '1:4',
        children: [
            <Box
                key="left"
                color="coral"
            >
                1
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                4
            </Box>,
        ],
    },
};

export const Gap4: Story = {
    args: {
        gap: '4',
        ratio: '1:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                Лево
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                Право
            </Box>,
        ],
    },
};

export const Gap8: Story = {
    args: {
        gap: '8',
        ratio: '1:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                Лево
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                Право
            </Box>,
        ],
    },
};

export const Gap16: Story = {
    args: {
        gap: '16',
        ratio: '1:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                Лево
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                Право
            </Box>,
        ],
    },
};

export const Gap32: Story = {
    args: {
        gap: '32',
        ratio: '1:1',
        children: [
            <Box
                key="left"
                color="coral"
            >
                Лево
            </Box>,
            <Box
                key="right"
                color="lightblue"
            >
                Право
            </Box>,
        ],
    },
};

export const WithComplexContent: Story = {
    args: {
        ratio: '3:1',
        gap: '16',
        children: [
            <Box
                key="left"
                color="lightgoldenrodyellow"
                style={{ height: 'auto' }}
            >
                <h3>Левая колонка (3 части)</h3>
                <p>Здесь может быть форма, текст, или другие компоненты</p>
            </Box>,
            <Box
                key="right"
                color="lightcyan"
                style={{ height: 'auto' }}
            >
                <h4>Правая (1 часть)</h4>
                <p>Навигация или сайдбар</p>
                <ul>
                    <li>Пункт 1</li>
                    <li>Пункт 2</li>
                </ul>
            </Box>,
        ],
    },
};
