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
}
