import type { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

const meta = {
    title: 'shared/Code',
    component: Code,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    argTypes: {
        children: {
            control: 'text',
            description: 'Код для отображения (обычно строка)',
        },
    },
    args: {
        children: `const greeting = "Hello, Storybook!";\nconsole.log(greeting);`,
    },
} satisfies Meta<typeof Code>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

interface InputProps {
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    label?: string;
    isActive?: boolean;
    size?: 'small' | 'medium' | 'large';
    type?: string;
}

export const LongCode: Story = {
    args: {
        children: `import React, { useState, FC, memo, ChangeEvent } from 'react';
import classNames from 'classnames';
import * cls from './Input.module.scss';
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    return (
        <div className={classNames(cls.container)}>
            <input type={type} value={value} onChange={handleChange} />
            <label className={classNames(cls.label)}>{label}</label>
        </div>
    );
});
`,
    },
};

export const PythonExample: Story = {
    args: {
        children: `def greet(name):
    """Greets the user."""
    message = f"Hello, {name}!"
    print(message)

greet("Storybook User")
`,
    },
};

export const HtmlExample: Story = {
    args: {
        children: `<div className="container">
    <h1>Заголовок</h1>
    <p>Какой-то параграф текста.</p>
    <Button onClick={handleClick}>Кнопка</Button>
</div>
`,
    },
};

export const Empty: Story = {
    args: {
        children: '',
    },
};

export const WithHtmlEntities: Story = {
    args: {
        children: `const Component = () => {
    const text = "<Hello> & 'World'"; // < > & ' "
    return <div>{text}</div>;
};`,
    },
    parameters: {
        docs: {
            description: {
                story: 'Проверяет, что спецсимволы HTML (`<`, `>`, `&`, `\'`, `"`) отображаются корректно внутри блока кода',
            },
        },
    },
};
