import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ArticlesTypeService} from "./articlesType.service";
import {CreateArticlesTypeDto} from "./dto/create-articlesType.dto";

@Controller('article-type')
export class ArticlesTypeController {
    constructor(private articlesTypeService: ArticlesTypeService) {}

    @Get("all")
    getAllTypes() {
        return this.articlesTypeService.getAllArticlesType();
    }

    @Post('create')
    createTypeArticle(@Body() dto: CreateArticlesTypeDto) {
        return this.articlesTypeService.createArticlesType(dto);
    }

    @Put("update/:id")
    updateTypeArticle(
        @Param("id") id: number,
        @Body() dto: CreateArticlesTypeDto
    ) {
        return this.articlesTypeService.updateArticlesType(id, dto);
    }

    @Delete("delete/:id")
    deleteTypeArticle(@Param("id") id: number) {
        return this.articlesTypeService.deleteArticlesType(id);
    }
}
