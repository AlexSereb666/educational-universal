import {Body, Controller, Delete, Get, Param, Post, Query} from "@nestjs/common";
import {ArticlesService} from "./articles.service";
import {CreateArticlesDto} from "./dto/create-articles.dto";

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) {}

    @Post('create')
    async createArticle(@Body() dto: CreateArticlesDto) {
        return this.articlesService.createArticle(dto);
    }

    @Get(':id')
    async getArticleById(@Param('id') id: number) {
        return this.articlesService.getArticleById(id);
    }

    @Get()
    async getAllArticles(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 20,
        @Query('sort') sort: string = 'id',
        @Query('order') order: string = 'asc',
        @Query('search') search: string = '',
        @Query('type') type: string = '0'
    ) {
        return this.articlesService.getAllArticles(page, limit, sort, order, search, type);
    }

    @Post('test')
    async createTestArticle() {
        return this.articlesService.createTestArticle();
    }

    @Delete(':id')
    async deleteArticle(@Param('id') id: number) {
        return this.articlesService.deleteArticle(id);
    }
}
