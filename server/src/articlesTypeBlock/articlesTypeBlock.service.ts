import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ArticlesTypeBlock} from "./articlesTypeBlock.model";
import {CreateArticlesTypeBlockDto} from "./dto/create-articlesTypeBlock.dto";

@Injectable()
export class ArticlesTypeBlockService {
    constructor(@InjectModel(ArticlesTypeBlock) private articlesTypeBlockRepository: typeof ArticlesTypeBlock) {}

    async getAllArticlesTypeBlocks() {
        const typeBlocks = await this.articlesTypeBlockRepository.findAll();
        return typeBlocks;
    }

    async createArticlesTypeBlock(dto: CreateArticlesTypeBlockDto) {
        if (!dto.name) {
            throw new HttpException(
                'Не указано имя типа',
                HttpStatus.BAD_REQUEST
            );
        }

        const typeBlock = await this.articlesTypeBlockRepository.create(dto);
        return typeBlock;
    }

    async updateArticlesTypeBlock(id: number, dto: CreateArticlesTypeBlockDto) {
        const typeBlock = await this.articlesTypeBlockRepository.findByPk(id);

        if (!typeBlock) {
            throw new HttpException(
                "Тип блока с указанным id не найден",
                HttpStatus.NOT_FOUND
            );
        }

        if (!dto.name) {
            throw new HttpException(
                "Не указано имя типа",
                HttpStatus.BAD_REQUEST
            );
        }

        typeBlock.name = dto.name;
        await typeBlock.save();
        return typeBlock;
    }

    async deleteArticlesTypeBlock(id: number) {
        const typeBlock = await this.articlesTypeBlockRepository.findByPk(id);

        if (!typeBlock) {
            throw new HttpException(
                "Тип блока с указанным id не найден",
                HttpStatus.NOT_FOUND
            );
        }

        await typeBlock.destroy();
        return { message: "Тип блока успешно удален" };
    }
}
