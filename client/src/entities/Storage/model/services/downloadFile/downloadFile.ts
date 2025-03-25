import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { toastActions } from '@/entities/Toast';
import { ToastType } from '@/shared/const/toast';

interface DownloadFileAttrs {
    fileId: number;
}

export const downloadFile = createAsyncThunk<
    void,
    DownloadFileAttrs,
    ThunkConfig<string>
>('storage/downloadFile', async ({ fileId }, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const user = getUserAuthData(getState());

    try {
        const response = await extra.api.get<Blob>(
            `/files/download/${fileId}/${user.id}`,
            { responseType: 'blob' },
        );

        const contentDisposition = response.headers['content-disposition'];
        const fileNameMatch = contentDisposition?.match(/filename="(.+?)"/);
        const fileName = fileNameMatch ? decodeURIComponent(fileNameMatch[1]) : 'file';

        const blob = new Blob([response.data]);
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        dispatch(
            toastActions.addToast({
                title: `Начало скачивания файла`,
                type: ToastType.INFO,
                duration: 3000,
            }),
        );

        return;
    } catch (e) {
        console.log(e);
        return rejectWithValue('Ошибка загрузки файла');
    }
});
