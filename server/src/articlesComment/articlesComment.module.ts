import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticleComment} from "./articlesComment.model";
import {ArticleCommentController} from "./articlesComment.controller";
import {ArticlesCommentService} from "./articlesComment.service";
import {User} from "../users/users.model";

@Module({
    controllers: [ArticleCommentController],
    providers: [ArticlesCommentService],
    imports: [
        SequelizeModule.forFeature([ArticleComment, User]),
    ]
})

export class ArticlesCommentModule {}
