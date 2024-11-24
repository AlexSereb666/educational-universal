import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticlesType} from "./articlesType.model";

@Module({
    imports: [
        SequelizeModule.forFeature([ArticlesType]),
    ],
})

export class ArticlesTypeModule {};
