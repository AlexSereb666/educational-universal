import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { ToastType } from '@/shared/const/toast';
import { toastActions } from '../model/slice/toastSlice';

export function useToast() {
    const dispatch = useDispatch();

    return useCallback(
        (title: string, type: ToastType = ToastType.INFO, duration: number = 3000) => {
            dispatch(toastActions.addToast({ title, type: type, duration }));
        },
        [dispatch],
    );
}
