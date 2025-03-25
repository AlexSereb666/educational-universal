import { ToastType } from '@/shared/const/toast';
import React, { useEffect, useState } from 'react';
import * as cls from './Toast.module.scss';
import classNames from 'classnames';
import SuccessIcon from '@/shared/assets/icons/SuccessStandardLine.svg';
import ErrorIcon from '@/shared/assets/icons/BxsErrorCircle.svg';
import InfoIcon from '@/shared/assets/icons/InfoCircleOutlined.svg';
import WarningIcon from '@/shared/assets/icons/WarningFilled.svg';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { HStack, VStack } from '../Stack';

interface ToastProps {
    className?: string;
    title: string;
    type: ToastType;
    duration: number;
}

interface ViewToast {
    [ToastType.SUCCESS]: React.VFC<React.SVGProps<SVGSVGElement>>;
    [ToastType.ERROR]: React.VFC<React.SVGProps<SVGSVGElement>>;
    [ToastType.INFO]: React.VFC<React.SVGProps<SVGSVGElement>>;
    [ToastType.WARNING]: React.VFC<React.SVGProps<SVGSVGElement>>;
}

const viewToast: ViewToast = {
    [ToastType.SUCCESS]: SuccessIcon,
    [ToastType.ERROR]: ErrorIcon,
    [ToastType.INFO]: InfoIcon,
    [ToastType.WARNING]: WarningIcon,
};

export const Toast = (props: ToastProps) => {
    const { className, title, type, duration } = props;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        let start: number;
        const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const elapsed = timestamp - start;
            const newProgress = 100 - (elapsed / duration) * 100;
            if (newProgress <= 0) {
                setProgress(0);
            } else {
                setProgress(newProgress);
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);

        return () => {
            cancelAnimationFrame(start);
        };
    }, [duration]);

    const icon = viewToast[type];

    return (
        <div className={classNames(cls.toast, className, cls[`toast-${type}`])}>
            <VStack max>
                <HStack
                    max
                    gap={'32'}
                >
                    <Icon
                        Svg={icon}
                        width={30}
                        height={30}
                        className={cls[`toastIcon-${type}`]}
                    />
                    <Text bold={true}>{title}</Text>
                </HStack>
                <div
                    className={cls.toastProgress}
                    style={{ width: `${progress}%` }}
                />
            </VStack>
        </div>
    );
};
