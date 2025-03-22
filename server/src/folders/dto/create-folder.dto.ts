import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateFolderDto {
    @IsString()
    name: string;

    @IsOptional()
    @IsInt()
    parentId?: number;
}
