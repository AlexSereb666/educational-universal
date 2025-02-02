import React, {ChangeEvent, memo} from "react";
import * as cls from "./InputContainer.module.scss";
import classNames from "classnames";

interface InputProps {
    value: string;
    onChange?: (value: string) => void;
    label?: string;
    isActive?: boolean;
    size?: 'small' | 'medium' | 'large';
    type?: string;
}

export const InputContainer = memo((props: InputProps) => {
    const {
        value,
        onChange,
        label,
        isActive = true,
        size = 'medium',
        type = 'text'
    } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(event.target.value);
        }
    };

    return (
        <div className={classNames(cls.container, cls[size], {[cls.active]: isActive})}>
            <input
                type={type}
                value={value}
                onChange={handleChange}
                className={cls.input}
                disabled={!isActive}
                placeholder={label}
            />
        </div>
    )
})
