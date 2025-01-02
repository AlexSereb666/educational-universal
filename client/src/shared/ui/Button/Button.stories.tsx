import React from 'react';
import { Button, ButtonProps } from './Button';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        onClick: { action: 'clicked' },
    },
};

const Template = (args: ButtonProps) => <Button {...args} />;

// История для стандартной кнопки
export const Default = Template.bind({});
Default.args = {
    children: 'Default Button', // Текст кнопки
    size: 'medium',
    disabled: false,
};

// История для маленькой кнопки
export const Small = Template.bind({});
Small.args = {
    children: 'Small Button',
    size: 'small',
    disabled: false,
};

// История для средней кнопки
export const Medium = Template.bind({});
Medium.args = {
    children: 'Medium Button',
    size: 'medium',
    disabled: false,
};

// История для большой кнопки
export const Large = Template.bind({});
Large.args = {
    children: 'Large Button',
    size: 'large',
    disabled: false,
};

// История для кнопки в состоянии disabled
export const Disabled = Template.bind({});
Disabled.args = {
    children: 'Disabled Button',
    size: 'medium',
    disabled: true,
};

// История для кнопки с кастомными цветами
export const CustomColors = Template.bind({});
CustomColors.args = {
    children: 'Custom Colors Button',
    size: 'medium',
    disabled: false,
    defaultColor: 'green',
    hoverColor: 'yellow',
    activeColor: 'red',
};
