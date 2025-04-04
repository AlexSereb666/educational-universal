import { StorageItemType } from '@/shared/const/storage';

export interface File {
    id: number;
    userId: number;
    folderId: number | null;
    name: string;
    size: number;
    mimeType: string;
    storagePath: string;
    createdAt: string;
    updatedAt: string;
    type?: StorageItemType.FILE;
}
