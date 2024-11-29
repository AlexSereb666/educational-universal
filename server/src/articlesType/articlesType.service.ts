import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ArticlesType} from "./articlesType.model";
import {CreateArticlesTypeDto} from "./dto/create-articlesType.dto";

@Injectable()
export class ArticlesTypeService {
    constructor(@InjectModel(ArticlesType) private articlesTypeRepository: typeof ArticlesType) {}

    async getAllArticlesType() {
        const types = await this.articlesTypeRepository.findAll();
        return types;
    }

    async createArticlesType(dto: CreateArticlesTypeDto) {
        if (!dto.name) {
            throw new HttpException(
                'Не указано имя типа',
                HttpStatus.BAD_REQUEST
            );
        }

        const type = await this.articlesTypeRepository.create(dto);
        return type;
    }

    async updateArticlesType(id: number, dto: CreateArticlesTypeDto) {
        const type = await this.articlesTypeRepository.findByPk(id);

        if (!type) {
            throw new HttpException(
                "Тип стать с указанным id не найден",
                HttpStatus.NOT_FOUND
            );
        }

        if (!dto.name) {
            throw new HttpException(
                "Не указано имя типа",
                HttpStatus.BAD_REQUEST
            );
        }

        type.name = dto.name;
        await type.save();
        return type;
    }

    async deleteArticlesType(id: number) {
        const type = await this.articlesTypeRepository.findByPk(id);

        if (!type) {
            throw new HttpException(
                "Тип статьи с указанным id не найден",
                HttpStatus.NOT_FOUND
            );
        }

        await type.destroy();
        return { message: "Тип статьи успешно удален" };
    }
}
