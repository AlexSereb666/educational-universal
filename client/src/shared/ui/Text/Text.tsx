import * as cls from './Text.module.scss';
import classNames from "classnames";
import {memo} from "react";

interface TextProps {
    className?: string;
    children: string;
    size?: 'small' | 'medium' | 'large';
    bold?: boolean;
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        children,
        size = 'small',
        bold = false,
    } = props;

    return (
        <span className={classNames(cls.Text, cls[size], {[cls.bold]: bold}, className)}>
            {children}
        </span>
    )
});
