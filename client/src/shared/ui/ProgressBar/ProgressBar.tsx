import * as React from 'react';
import { memo } from 'react';
import * as cls from './ProgressBar.module.scss';
import classNames from 'classnames';
import { Text } from '../Text';

interface ProgressBarProps {
    className?: string;
    progress: number;
}

export const ProgressBar = memo((props: ProgressBarProps) => {
    const { className, progress } = props;

    return (
        <div className={classNames(cls.ProgressBar, {}, [className])}>
            <div
                className={cls.fill}
                style={{ width: `${progress}%` }}
            />
            <Text className={cls.label}>{`${progress}%`}</Text>
        </div>
    );
});
