import { Folder } from './folder';
import { File } from './file';

export type StorageItem = Folder | File;

export interface CloudStorage {
    currentFolder: Folder | null;
    items: StorageItem[];
}
