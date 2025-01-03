import {Injectable} from "@nestjs/common";
import {ArticleComment} from "./articlesComment.model";
import {User} from "../users/users.model";
import {InjectModel} from "@nestjs/sequelize";

@Injectable()
export class ArticlesCommentService {
    constructor(
        @InjectModel(ArticleComment) private articlesCommentRepository: typeof ArticleComment,
        @InjectModel(User) private userRepository: typeof User,
    ) {}

    async addNewComment(userId: number, articleId: number, text: string) {
        return await this.articlesCommentRepository.create({
            userId,
            articleId,
            text,
            date: new Date()
        });
    }

    async findAllCommentsArticle(articleId: number) {
        return await this.articlesCommentRepository.findAll({
            where: { articleId },
            include: [{
                model: User,
                attributes: ['id', 'login', 'email', 'isActivated']
            }]
        });
    }
}