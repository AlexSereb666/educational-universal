import { Button } from '@/shared/ui/Button';
import { memo } from 'react';
import { useTranslation } from '@/shared/lib/hooks/useTranslation/useTranslation';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { cloudStoragePreferencesActions, uploadFile } from '@/entities/Storage';
import { FileInput } from '@/shared/ui/FileInput/FileInput';

export const CloudStorageUploadFile = memo(() => {
    const { t } = useTranslation('CloudStorageUploadFile');
    const dispatch = useAppDispatch();

    const handleFileUpload = (files: File[]) => {
        files.forEach((file) => {
            dispatch(
                cloudStoragePreferencesActions.addFileUploads({
                    fileName: file.name,
                    progress: 0,
                }),
            );
            dispatch(cloudStoragePreferencesActions.setIsActiveUploadFile(true));

            dispatch(
                uploadFile({
                    file,
                    onProgress: (percent) => {
                        dispatch(
                            cloudStoragePreferencesActions.setProgressUploadFile({
                                fileName: file.name,
                                progress: percent,
                            }),
                        );
                    },
                }),
            );
        });
    };

    return (
        <FileInput onFileSelect={handleFileUpload}>
            <Button size="small">{t('Загрузить файлы')}</Button>
        </FileInput>
    );
});
