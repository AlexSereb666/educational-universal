import React, {useState, FC, memo, CSSProperties} from 'react';
import classNames from 'classnames';
import * as cls from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    value: string;
    options: SelectOption[];
    onChange?: (value: string) => void;
    label?: string;
    placeholder?: string;
    isActive?: boolean;
    size?: 'small' | 'medium' | 'large';
    labelPosition?: 'top' | 'left';
    width?: string | number;
}

export const Select: FC<SelectProps> = memo((props: SelectProps) => {
    const {
        value,
        options,
        onChange,
        label,
        placeholder = 'Select...',
        isActive = true,
        size = 'medium',
        labelPosition = 'top',
        width,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const handleSelect = (selectedValue: string) => {
        if (onChange) {
            onChange(selectedValue);
        }
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (isActive) setIsOpen((prev) => !prev);
    };

    const containerStyle: CSSProperties = width ? { width } : {};

    return (
        <div
            className={classNames(
                cls.container,
                cls[size],
                cls[labelPosition],
                { [cls.active]: isActive }
            )}
            onBlur={() => {
                setIsFocused(false);
                setIsOpen(false);
            }}
            onFocus={() => setIsFocused(true)}
            tabIndex={0}
        >
            {label && (
                <label
                    className={classNames(cls.label, {
                        [cls.focused]: isFocused || value,
                    })}
                >
                    {label}
                </label>
            )}
            <div
                className={classNames(cls.select, {
                    [cls.focused]: isFocused,
                })}
                style={containerStyle}
                onClick={toggleDropdown}
            >
                <span
                    className={classNames(cls.selected, {
                        [cls.placeholder]: !value,
                    })}
                >
                    {value ? options.find((option) => option.value === value)?.label : placeholder}
                </span>
                <div className={cls.arrow} />
            </div>
            {isOpen && (
                <ul className={classNames(cls.dropdown, cls[size])}>
                    {options.map((option) => (
                        <li
                            key={option.value}
                            className={classNames(cls.option, {
                                [cls.selected]: option.value === value,
                            })}
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
});
