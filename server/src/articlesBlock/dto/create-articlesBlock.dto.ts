import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class CreateArticlesBlockDto {
    @IsOptional()
    @IsNumber()
    readonly id?: number;

    @IsNotEmpty()
    @IsNumber()
    readonly step: number;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    articleId: number;

    @IsNotEmpty()
    @IsNumber()
    typeBlockId: number;
}
