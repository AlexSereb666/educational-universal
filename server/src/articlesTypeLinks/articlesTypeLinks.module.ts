import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticleTypesLink} from "./articlesTypeLinks.model";

@Module({
    imports: [
        SequelizeModule.forFeature([ArticleTypesLink]),
    ],
})

export class ArticlesTypeLinksModule {};
