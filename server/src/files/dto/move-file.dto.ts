import { IsInt, IsOptional, IsNumber } from 'class-validator';

export class MoveFileDto {
    @IsInt()
    userId: number;

    @IsInt()
    fileId: number;

    @IsOptional()
    @IsNumber()
    targetFolderId: number | null;
}
