import { StorageItemType } from '@/shared/const/storage';

export interface Folder {
    id: number;
    userId: number;
    parentId: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
    type?: StorageItemType.FOLDER;
}
