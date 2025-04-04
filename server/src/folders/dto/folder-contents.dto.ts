import { FolderItemDto } from './folder.dto';
import { FileItemDto } from './file.dto';

export class FolderContentsDto {
    currentFolder: FolderItemDto | null;
    items: (FolderItemDto | FileItemDto)[];

    constructor(
        currentFolder: FolderItemDto,
        folders: FolderItemDto[],
        files: FileItemDto[],
    ) {
        this.currentFolder = currentFolder ? new FolderItemDto(currentFolder) : null;

        const folderItems = folders.map((folder) => new FolderItemDto(folder));
        const fileItems = files.map((file) => new FileItemDto(file));

        this.items = [...folderItems, ...fileItems];
    }
}
