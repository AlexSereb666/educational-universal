import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticlesBlock} from "./articlesBlock.model";

@Module({
    imports: [
        SequelizeModule.forFeature([ArticlesBlock]),
    ],
})

export class ArticlesBlockModule {};
