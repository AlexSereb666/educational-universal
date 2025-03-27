import * as React from 'react';
import { ReactNode } from 'react';
import * as cls from './Split.module.scss';
import classNames from 'classnames';

export type SplitRatio = '1:1' | '2:1' | '3:1' | '4:1' | '1:2' | '1:3' | '1:4';

export interface SplitProps {
    className?: string;
    children: [ReactNode, ReactNode];
    ratio?: SplitRatio;
    gap?: '4' | '8' | '16' | '32';
}

const ratioClasses: Record<SplitRatio, string> = {
    '1:1': cls.ratio1_1,
    '2:1': cls.ratio2_1,
    '3:1': cls.ratio3_1,
    '4:1': cls.ratio4_1,
    '1:2': cls.ratio1_2,
    '1:3': cls.ratio1_3,
    '1:4': cls.ratio1_4,
};

const gapClasses: Record<Exclude<SplitProps['gap'], undefined>, string> = {
    '4': cls.gap4,
    '8': cls.gap8,
    '16': cls.gap16,
    '32': cls.gap32,
};

export const Split = (props: SplitProps) => {
    const { className, children, ratio = '1:1', gap = '8' } = props;

    return (
        <div
            className={classNames(
                cls.Split,
                className,
                ratioClasses[ratio],
                gapClasses[gap],
            )}
        >
            <div className={cls.SplitItem}>{children[0]}</div>
            <div className={cls.SplitItem}>{children[1]}</div>
        </div>
    );
};
