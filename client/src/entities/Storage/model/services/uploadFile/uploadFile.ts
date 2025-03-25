import { createAsyncThunk } from '@reduxjs/toolkit';
import { File as CFile } from '../../types/file';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { selectCloudStorageData } from '../../selectors/cloudStorage';
import { toastActions } from '@/entities/Toast';
import { ToastType } from '@/shared/const/toast';
import { truncateString } from '@/shared/lib/string/truncateString';

interface UploadFileAttrs {
    file: File;
    onProgress?: (percent: number) => void;
}

export const uploadFile = createAsyncThunk<CFile, UploadFileAttrs, ThunkConfig<string>>(
    'storage/uploadFile',
    async ({ file, onProgress }, thunkApi) => {
        const { extra, rejectWithValue, getState, dispatch } = thunkApi;

        const user = getUserAuthData(getState());
        const data = selectCloudStorageData(getState());

        const formData = new FormData();
        formData.append('file', file);

        if (data.currentFolder?.id) {
            formData.append('folderId', String(data.currentFolder.id));
        }

        try {
            const response = await extra.api.post<CFile>(
                `/files/${user.id}/upload`,
                formData,
                {
                    headers: {},
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / (progressEvent.total || 1),
                        );
                        if (percentCompleted === 100) {
                            dispatch(
                                toastActions.addToast({
                                    title: `${truncateString(file.name, 20)} успешно загружен`,
                                    type: ToastType.SUCCESS,
                                    duration: 3000,
                                }),
                            );
                        }
                        onProgress?.(percentCompleted);
                    },
                },
            );

            if (!response.data) {
                return rejectWithValue('Ошибка загрузки файлов');
            }

            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('Ошибка загрузки файлов');
        }
    },
);
