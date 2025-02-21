import {Body, Controller, Get, Param, Post, Query} from "@nestjs/common";
import {ArticleRatingsService} from "./articleRatings.service";
import {ArticleRatingsDto} from "./dto/articleRatings.dto";

@Controller('article-ratings')
export class ArticleRatingsController {
    constructor(private readonly articleRatingsService: ArticleRatingsService) {}

    @Post('add-rating')
    addRatingArticle(@Body() dto: ArticleRatingsDto) {
        return this.articleRatingsService.addRatingArticle(dto);
    }

    @Get()
    findRatingArticleByUserId(
        @Query('userId') userId: number,
        @Query('articleId') articleId: number
    ) {
        return this.articleRatingsService.findRatingArticleByUserId(userId, articleId);
    }
}
