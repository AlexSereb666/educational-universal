import {Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import {ArticlesTypeBlockService} from "./articlesTypeBlock.service";
import {CreateArticlesTypeBlockDto} from "./dto/create-articlesTypeBlock.dto";

@Controller('article-type-block')
export class ArticlesTypeBlockController {
    constructor(private articlesTypeBlockService: ArticlesTypeBlockService) {}

    @Get("all")
    getAllTypeBlocks() {
        return this.articlesTypeBlockService.getAllArticlesTypeBlocks();
    }

    @Post('create')
    createTypeBlockArticle(@Body() dto: CreateArticlesTypeBlockDto) {
        return this.articlesTypeBlockService.createArticlesTypeBlock(dto);
    }

    @Put("update/:id")
    updateTypeBlockArticle(
        @Param("id") id: number,
        @Body() dto: CreateArticlesTypeBlockDto
    ) {
        return this.articlesTypeBlockService.updateArticlesTypeBlock(id, dto);
    }

    @Delete("delete/:id")
    deleteTypeBlockArticle(@Param("id") id: number) {
        return this.articlesTypeBlockService.deleteArticlesTypeBlock(id);
    }
}
