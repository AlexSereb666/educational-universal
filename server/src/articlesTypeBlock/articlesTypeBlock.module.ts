import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {ArticlesTypeBlock} from "./articlesTypeBlock.model";
import {ArticlesTypeBlockController} from "./articlesTypeBlock.controller";
import {ArticlesTypeBlockService} from "./articlesTypeBlock.service";

@Module({
    controllers: [ArticlesTypeBlockController],
    providers: [ArticlesTypeBlockService],
    imports: [
        SequelizeModule.forFeature([ArticlesTypeBlock]),
    ],
})

export class ArticlesTypeBlockModule {};
