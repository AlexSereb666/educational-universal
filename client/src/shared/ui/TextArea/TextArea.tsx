import * as React from 'react';
import { ChangeEvent, memo } from 'react';
import * as cls from './TextArea.module.scss';

interface TextAreaProps {
    placeholder?: string;
    size?: 'small' | 'medium' | 'large';
    value: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
    resizable?: boolean;
}

export const TextArea = memo((props: TextAreaProps) => {
    const { placeholder, size, value, onChange, disabled, resizable } = props;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }
    };

    return (
        <textarea
            className={`${cls.text_area} ${cls[size]} ${resizable ? cls.resizable : cls.non_resizable}`}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            disabled={disabled}
        />
    );
});
