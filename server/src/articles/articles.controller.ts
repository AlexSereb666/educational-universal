import {Body, Controller, Get, Param, Post} from "@nestjs/common";
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
    async getAllArticles() {
        return this.articlesService.getAllArticles();
    }
}
