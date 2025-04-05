import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class MoveFolderDto {
    @IsInt()
    userId: number;

    @IsInt()
    folderId: number;

    @IsOptional()
    @IsNumber()
    targetParentId: number | null;
}
