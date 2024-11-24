import {Module} from "@nestjs/common";
import {SequelizeModule} from "@nestjs/sequelize";
import {Articles} from "./articles.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Articles]),
    ],
})

export class ArticlesModule {};
