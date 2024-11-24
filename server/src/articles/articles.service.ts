import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Articles} from "./articles.model";

@Injectable()
export class ArticlesService {
    constructor(@InjectModel(Articles) private articlesRepository: typeof Articles) {}

}
