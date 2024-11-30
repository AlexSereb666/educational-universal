import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Articles} from "./articles.model";
import {ArticlesController} from "./articles.controller";
import {ArticlesService} from "./articles.service";
import {ArticlesTypeModule} from "../articlesType/articlesType.module";
import {ArticlesTypeLinksModule} from "../articlesTypeLinks/articlesTypeLinks.module";
import {ArticlesBlockModule} from "../articlesBlock/articlesBlock.module";
import {ArticlesTypeBlockModule} from "../articlesTypeBlock/articlesTypeBlock.module";

@Module({
    controllers: [ArticlesController],
    providers: [ArticlesService],
    imports: [
        SequelizeModule.forFeature([Articles]),
        ArticlesTypeModule,
        ArticlesTypeLinksModule,
        ArticlesBlockModule,
        ArticlesTypeBlockModule,
    ],
})

export class ArticlesModule {};
