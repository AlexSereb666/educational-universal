import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Switch } from './Switch';

const meta = {
    title: 'shared/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {
        value: {
            description: 'Текущее состояние переключателя (вкл/выкл)',
        },
        onChange: {
            action: 'changed',
            description: 'Функция, вызываемая при изменении состояния',
        },
        disabled: {
            control: 'boolean',
            description: 'Блокирует переключатель',
        },
        label: {
            control: 'text',
            description: 'Текстовая метка для переключателя',
        },
        sizeLabel: {
            control: 'select',
            options: ['small', 'medium', 'large'],
            description: 'Размер текста метки',
        },
        positionLabel: {
            control: 'radio',
            options: ['left', 'right'],
            description: 'Положение метки относительно переключателя',
        },
        alignment: {
            control: 'select',
            options: ['left', 'right', 'center', 'between'],
            description: 'Выравнивание контейнера метки и переключателя',
        },
    },
    args: {
        value: false,
        onChange: fn(),
        disabled: false,
        label: 'Лейбл слева',
        sizeLabel: 'medium',
        positionLabel: 'left',
        alignment: 'left',
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
    render: (args) => {
        const [isChecked, setIsChecked] = useState(args.value);

        const handleChange = (newValue: boolean) => {
            args.onChange(newValue);
            setIsChecked(newValue);
        };

        return (
            <Switch
                {...args}
                value={isChecked}
                onChange={handleChange}
            />
        );
    },
    args: {
        label: 'Интерактивный переключатель',
    },
};

export const Checked: Story = {
    render: Interactive.render,
    args: {
        value: true,
        label: 'Включен по умолчанию',
    },
};

export const Unchecked: Story = {
    render: Interactive.render,
    args: {
        value: false,
        label: 'Выключен по умолчанию',
    },
};

export const DisabledChecked: Story = {
    args: {
        value: true,
        disabled: true,
        label: 'Заблокирован (Вкл)',
    },
};

export const DisabledUnchecked: Story = {
    args: {
        value: false,
        disabled: true,
        label: 'Заблокирован (Выкл)',
    },
};

export const LabelRight: Story = {
    render: Interactive.render,
    args: {
        label: 'Лейбл справа',
        positionLabel: 'right',
    },
};

export const LabelSmall: Story = {
    render: Interactive.render,
    args: {
        label: 'Маленький лейбл',
        sizeLabel: 'small',
    },
};

export const LabelLarge: Story = {
    render: Interactive.render,
    args: {
        label: 'Большой лейбл',
        sizeLabel: 'large',
    },
};

export const NoLabel: Story = {
    render: Interactive.render,
    args: {
        label: undefined,
    },
};

export const AlignCenter: Story = {
    render: Interactive.render,
    args: {
        label: 'Выравнивание Центр',
        alignment: 'center',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px', border: '1px dashed grey' }}>
                <Story />
            </div>
        ),
    ],
};

export const AlignRight: Story = {
    render: Interactive.render,
    args: {
        label: 'Выравнивание Право',
        alignment: 'right',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px', border: '1px dashed grey' }}>
                <Story />
            </div>
        ),
    ],
};

export const AlignBetween: Story = {
    render: Interactive.render,
    args: {
        label: 'Выравнивание Between',
        alignment: 'between',
        positionLabel: 'left',
    },
    decorators: [
        (Story) => (
            <div style={{ width: '300px', border: '1px dashed grey' }}>
                <Story />
            </div>
        ),
    ],
};
