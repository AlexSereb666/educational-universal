import * as React from 'react';
import { Switch as HSwitch } from '@headlessui/react';
import { memo } from 'react';
import * as cls from './Switch.module.scss';
import classNames from 'classnames';

interface SwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    label?: string;
    sizeLabel?: 'small' | 'medium' | 'large';
    positionLabel?: 'left' | 'right';
    alignment?: 'left' | 'right' | 'center' | 'between';
}

export const Switch = memo((props: SwitchProps) => {
    const {
        value,
        onChange,
        disabled = false,
        label,
        sizeLabel = 'medium',
        positionLabel = 'left',
        alignment = 'left',
    } = props;

    const labelClass = classNames(
        cls.label,
        cls[`label-${sizeLabel}`],
        cls[`label-${positionLabel}`],
    );

    const containerClass = classNames(cls.switchContainer, cls[`alignment-${alignment}`]);

    return (
        <div className={containerClass}>
            {label && positionLabel === 'left' && (
                <span className={labelClass}>{label}</span>
            )}
            <HSwitch
                checked={value}
                onChange={disabled ? () => {} : onChange}
                className={classNames(
                    cls.switch,
                    { [cls['switch-enabled']]: value },
                    { [cls['switch-disabled']]: disabled },
                )}
            >
                <span
                    className={classNames(
                        cls['switch-thumb'],
                        { [cls['switch-thumb-enabled']]: value },
                        { [cls['switch-thumb-disabled']]: disabled },
                    )}
                />
            </HSwitch>
            {label && positionLabel === 'right' && (
                <span className={labelClass}>{label}</span>
            )}
        </div>
    );
});
