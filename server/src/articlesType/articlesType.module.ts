import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticlesType} from "./articlesType.model";
import {ArticlesTypeController} from "./articlesType.controller";
import {ArticlesTypeService} from "./articlesType.service";

@Module({
    controllers: [ArticlesTypeController],
    providers: [ArticlesTypeService],
    imports: [
        SequelizeModule.forFeature([ArticlesType]),
    ],
})

export class ArticlesTypeModule {};
