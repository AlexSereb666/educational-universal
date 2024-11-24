import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticlesTypeBlock} from "./articlesTypeBlock.model";

@Module({
    imports: [
        SequelizeModule.forFeature([ArticlesTypeBlock]),
    ],
})

export class ArticlesTypeBlockModule {};
