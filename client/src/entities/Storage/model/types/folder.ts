export interface Folder {
    id: number;
    userId: number;
    parentId: number | null;
    name: string;
    createdAt: string;
    updatedAt: string;
}
