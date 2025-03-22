import { IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UploadFileDto {
    @IsOptional()
    @Transform(({ value }) => parseInt(value, 10))
    @IsInt()
    folderId?: number;
}
