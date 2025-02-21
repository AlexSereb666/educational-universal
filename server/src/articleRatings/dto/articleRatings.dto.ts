import {IsNotEmpty, IsNumber, IsOptional, IsString} from "class-validator";

export class ArticleRatingsDto {
    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly articleId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly score: number;

    @IsOptional()
    @IsString()
    readonly feedback?: string;
}
