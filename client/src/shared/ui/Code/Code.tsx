import {memo, ReactNode, useState} from "react";
import * as cls from './Code.module.scss';
import copyIcon from '@/shared/assets/copy.png';
import copySuccesIcon from '@/shared/assets/copySucces.png';

interface CodeProps {
    children: ReactNode;
}

export const Code = memo((props: CodeProps) => {
    const { children} = props;
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(String(children))
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
            })
            .catch(err => console.error('Ошибка копирования: ', err));
    };

    return (
        <pre className={cls.codeContainer}>
            <img
                src={copied ? copySuccesIcon as string : copyIcon as string}
                alt={'Копировать'}
                className={cls.copyBtn}
                onClick={copyToClipboard}
                style={{ cursor: copied ? 'not-allowed' : 'pointer' }}
            />
            <code className={cls.code}>
                {children}
            </code>
        </pre>
    )
});
