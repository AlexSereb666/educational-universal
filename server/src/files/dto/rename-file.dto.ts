import { IsInt, IsString } from 'class-validator';

export class RenameFileDto {
    @IsInt()
    userId: number;

    @IsInt()
    fileId: number;

    @IsString()
    newName: string;
}
