import { Folder } from './folder';
import { File } from './file';

export interface CloudStorage {
    currentFolder: Folder | null;
    folders: Folder[];
    files: File[];
}
