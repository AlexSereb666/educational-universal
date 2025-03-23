import { IsInt, IsString } from 'class-validator';

export class RenameFolderDto {
    @IsInt()
    userId: number;

    @IsInt()
    folderId: number;

    @IsString()
    newName: string;
}
