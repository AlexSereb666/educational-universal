import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ArticleRatings} from "./articleRatings.model";
import {ArticleRatingsDto} from "./dto/articleRatings.dto";

@Injectable()
export class ArticleRatingsService {
    constructor(
        @InjectModel(ArticleRatings) private articleRatingsRepository: typeof ArticleRatings,
    ) {}

    async addRatingArticle(dto: ArticleRatingsDto) {
        return this.articleRatingsRepository.create(dto);
    }

    async findRatingArticleByUserId(userId: number, articleId: number) {
        const rating = await this.articleRatingsRepository.findOne({
            where: { userId, articleId },
        });

        if (!rating) {
            return null;
        }

        return rating;
    }
}
