import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {ArticlesCommentService} from "./articlesComment.service";

@Controller('article-comments')
export class ArticleCommentController {
    constructor(private articlesCommentService: ArticlesCommentService) {}

    @Post('add')
    async addNewComment(
        @Body('userId') userId: number,
        @Body('articleId') articleId: number,
        @Body('text') text: string
    ) {
        return await this.articlesCommentService.addNewComment(userId, articleId, text);
    }

    @Get('article/:id')
    async findAllCommentsArticle(@Param('id') id: number) {
        return await this.articlesCommentService.findAllCommentsArticle(id);
    }
}