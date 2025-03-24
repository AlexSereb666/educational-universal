import { View } from '@/shared/const/view';

export interface UploadFile {
    fileName: string;
    progress: number;
}

export interface CloudStoragePreferencesSchema {
    currentFolderId: number | null;
    view: View;
    uploadFiles: UploadFile[];
    isActiveUpload: boolean;
}
