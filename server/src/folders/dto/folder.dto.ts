export class FolderItemDto {
    id: number;
    name: string;
    createdAt: Date;
    parentId: number | null;
    type?: 'folder' = 'folder';

    constructor(model: any) {
        this.id = model.id;
        this.name = model.name;
        this.createdAt = model.createdAt;
        this.parentId = model.parentId ?? null;
    }
}
