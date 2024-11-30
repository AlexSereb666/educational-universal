import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateArticlesTypeBlockDto {
    @IsOptional()
    @IsNumber()
    readonly id?: number;

    @IsNotEmpty()
    @IsString()
    readonly name: string;
}
