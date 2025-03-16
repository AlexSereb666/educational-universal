import { memo, ReactNode, useState } from 'react';
import * as cls from './Code.module.scss';
import copyIcon from 'shared/assets/icons/Copy.svg';
import { Icon } from '@/shared/ui/Icon';

interface CodeProps {
    children: ReactNode;
}

export const Code = memo((props: CodeProps) => {
    const { children } = props;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard
            .writeText(String(children))
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            })
            .catch((err) => console.error('Ошибка копирования: ', err));
    };

    return (
        <pre className={cls.codeContainer}>
            <Icon
                Svg={copyIcon}
                width={25}
                height={25}
                className={cls.copyBtn}
                onClick={copyToClipboard}
            />
            <code className={cls.code}>{children}</code>
        </pre>
    );
});
