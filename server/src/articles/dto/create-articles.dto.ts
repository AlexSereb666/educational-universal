import {IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";
import {CreateArticlesTypeDto} from "../../articlesType/dto/create-articlesType.dto";
import {CreateArticlesBlockDto} from "../../articlesBlock/dto/create-articlesBlock.dto";

export class CreateArticlesDto {
    @IsOptional()
    @IsNumber()
    readonly id?: number;

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly subtitle: string;

    @IsOptional()
    @IsString()
    readonly img: string;

    @IsNumber()
    readonly view: number;

    @IsOptional()
    readonly createdAt?: Date;

    @IsOptional()
    readonly updatedAt?: Date;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateArticlesTypeDto)
    readonly typeIds: CreateArticlesTypeDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateArticlesBlockDto)
    readonly blocks: CreateArticlesBlockDto[];
}
