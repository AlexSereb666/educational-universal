import React, { useState, FC, memo, ChangeEvent } from 'react';
import classNames from 'classnames';
import * as cls from './Input.module.scss';

interface InputProps {
    className?: string;
    value: string;
    onChange?: (value: string) => void;
    label?: string;
    isActive?: boolean;
    size?: 'small' | 'medium' | 'large';
    type?: string;
}

export const Input: FC<InputProps> = memo((props: InputProps) => {
    const {
        value,
        onChange,
        label,
        isActive = true,
        size = 'medium',
        type = 'text',
        className,
    } = props;

    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        if (!value) {
            setIsFocused(false);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div
            className={classNames(cls.container, className, cls[size], {
                [cls.active]: isActive,
            })}
        >
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={cls.input}
                disabled={!isActive}
            />
            <label
                className={classNames(cls.label, { [cls.focused]: isFocused || value })}
            >
                {label}
            </label>
        </div>
    );
});
