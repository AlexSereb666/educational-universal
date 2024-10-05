import React from 'react';
import classNames from 'classnames';
import * as cls from './Button.module.scss';

interface ButtonProps {
    size?: 'small' | 'medium' | 'large';
    defaultColor?: string;
    hoverColor?: string;
    activeColor?: string;
    disabled?: boolean;
    onClick?: () => void;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  disabled = false,
  onClick,
  children,
}) => {

    return (
        <button
            className={classNames(
                cls.button,
                cls[`button--${size}`],
                { [cls['button--disabled']]: disabled }
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
