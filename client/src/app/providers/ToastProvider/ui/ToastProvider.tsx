import { ReactNode, useEffect } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toastActions, useToastData } from '@/entities/Toast';
import { Toast } from '@/shared/ui/Toast/Toast';
import * as cls from './ToastProvider.module.scss';
import classNames from 'classnames';

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = (props: ToastProviderProps) => {
    const { children } = props;
    const dispatch = useAppDispatch();
    const toasts = useToastData();

    useEffect(() => {
        toasts.forEach((toast) => {
            const timerId = setTimeout(() => {
                dispatch(toastActions.removeToast(toast.id));
            }, toast.duration);

            return () => clearTimeout(timerId);
        });
    }, [toasts, dispatch]);

    return (
        <>
            <div className={classNames(cls.toastContainer)}>
                {toasts.map((toast) => (
                    <Toast
                        key={toast.id}
                        title={toast.title}
                        type={toast.type}
                        duration={toast.duration}
                    />
                ))}
            </div>
            {children}
        </>
    );
};
