import { ToastType } from '@/shared/const/toast';

export interface Toast {
    id: string;
    title: string;
    type: ToastType;
    duration: number;
}
