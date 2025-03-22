import { View } from '@/shared/const/view';

export interface CloudStoragePreferencesSchema {
    currentFolderId: number | null;
    view: View;
}
