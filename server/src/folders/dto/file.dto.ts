export class FileItemDto {
    id: number;
    name: string;
    size: number;
    mimeType: string;
    storagePath: string;
    createdAt: Date;
    folderId: number | null;
    type?: 'file' = 'file';

    constructor(model: any) {
        this.id = model.id;
        this.name = model.name;
        this.size = model.size;
        this.mimeType = model.mimeType;
        this.storagePath = model.storagePath;
        this.createdAt = model.createdAt;
        this.folderId = model.folderId ?? null;
    }
}
