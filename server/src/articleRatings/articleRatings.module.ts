import {Module} from "@nestjs/common";
import {ArticleRatingsController} from "./articleRatings.controller";
import {ArticleRatingsService} from "./articleRatings.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticleRatings} from "./articleRatings.model";

@Module({
    controllers: [ArticleRatingsController],
    providers: [ArticleRatingsService],
    imports: [
        SequelizeModule.forFeature([ArticleRatings]),
    ],
    exports: [],
})
export class ArticleRatingsModule {}
