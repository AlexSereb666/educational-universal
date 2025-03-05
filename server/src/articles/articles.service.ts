import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Articles} from "./articles.model";
import {ArticlesType} from "../articlesType/articlesType.model";
import {ArticlesBlock} from "../articlesBlock/articlesBlock.model";
import {Sequelize} from "sequelize";
import {CreateArticlesDto} from "./dto/create-articles.dto";
import {ArticlesTypeBlock} from "../articlesTypeBlock/articlesTypeBlock.model";
import { Op } from 'sequelize';
import {User} from "../users/users.model";
import {ArticleComment} from "../articlesComment/articlesComment.model";

@Injectable()
export class ArticlesService {
    constructor(
        @InjectModel(Articles) private articlesRepository: typeof Articles,
        @InjectModel(ArticlesType) private articlesTypeRepository: typeof ArticlesType,
        @InjectModel(ArticlesBlock) private articlesBlockRepository: typeof ArticlesBlock,
        @InjectConnection() private sequelize: Sequelize,
    ) {}

    async createArticle(dto: CreateArticlesDto) {
        const transaction = await this.sequelize.transaction();

        try {
            const article: any = await this.articlesRepository.create(
                {
                    title: dto.title,
                    subtitle: dto.subtitle,
                    img: dto.img,
                    view: dto.view,
                },
                { transaction } as any
            );

            if (dto.typeIds && dto.typeIds.length > 0) {
                const typeLinks = dto.typeIds.map((typeId) => ({
                    articleId: article.id,
                    typeId: typeId,
                }));
                await this.sequelize.models.ArticleTypesLink.bulkCreate(typeLinks, { transaction });
            }

            if (dto.blocks && dto.blocks.length > 0) {
                const blocks = dto.blocks.map((block) => ({
                    ...block,
                    articleId: article.id,
                }));
                await this.articlesBlockRepository.bulkCreate(blocks, { transaction } as any);
            }

            await transaction.commit();
            return article;

        } catch (error) {
            await transaction.rollback();
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Ошибка создания статьи',
                    error: error.message,
                    details: error.errors || null,
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async getArticleById(id: number) {
        const article = await this.articlesRepository.findByPk(id, {
            include: [
                {
                    model: ArticlesType,
                    attributes: ['id', 'name'],
                    through: { attributes: [] },
                },
                {
                    model: ArticlesBlock,
                    attributes: ['id', 'step', 'content', 'title'],
                    include: [
                        {
                            model: ArticlesTypeBlock,
                            attributes: ['id', 'name'],
                        },
                    ],
                },
                {
                    model: User,
                    attributes: ['id', 'login', 'email'],
                },
            ],
        });

        if (!article) {
            throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND);
        }

        if (article.blocks) {
            article.blocks.sort((a, b) => a.step - b.step);
        }

        return article;
    }

    async getAllArticles(page: number, limit: number, sort: string, order: string, search: string, type: string) {
        const offset = (page - 1) * limit;

        const whereCondition = search ? { title: { [Op.like]: `%${search}%` } } : {};

        const includeCondition = type && type !== '0'
            ? [{
                model: ArticlesType,
                where: { id: Number(type) },
                attributes: ['id', 'name'],
                through: { attributes: [] },
            }]
            : [{
                model: ArticlesType,
                attributes: ['id', 'name'],
                through: { attributes: [] },
            }];

        const articles = await this.articlesRepository.findAll({
            where: whereCondition,
            include: [
                ...includeCondition,
                {
                    model: ArticlesBlock,
                    attributes: ['id', 'step', 'content', 'title'],
                    include: [
                        {
                            model: ArticlesTypeBlock,
                            attributes: ['id', 'name'],
                        },
                    ],
                },
            ],
            limit,
            offset,
            order: [[sort, order]],
        });

        articles.forEach(article => {
            if (article.blocks) {
                article.blocks.sort((a, b) => a.step - b.step);
            }
        });

        return articles;
    }

    async createTestArticle() {
        const transaction = await this.sequelize.transaction();

        try {
            const article: any = await this.articlesRepository.create(
                {
                    title: 'Тестовая статья',
                    subtitle: 'Это подзаголовок тестовой статьи',
                    img: 'test_image.jpg',
                    view: 0,
                    userId: 1,
                },
                { transaction } as any
            );

            const createdTypes = [
                { id: 1 },
                { id: 2 },
                { id: 3 },
            ];

            const typeLinks = createdTypes.map((type) => ({
                articleId: article.id,
                typeId: type.id,
            }));
            await this.sequelize.models.ArticleTypesLink.bulkCreate(typeLinks, { transaction });

            const testBlocks = [
                { step: 1, title: 'Блок 1', content: 'Контент блока 1', articleId: article.id, typeBlockId: 1 },
                { step: 2, title: 'Блок 2', content: 'Контент блока 2', articleId: article.id, typeBlockId: 1 },
            ];
            await this.articlesBlockRepository.bulkCreate(testBlocks, { transaction });

            await transaction.commit();
            return article;
        } catch (error) {
            await transaction.rollback();
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Ошибка создания тестовой статьи',
                    error: error.message,
                    details: error.errors || null,
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async deleteArticle(id: number) {
        const transaction = await this.sequelize.transaction();

        try {
            const article = await this.articlesRepository.findByPk(id);
            if (!article) {
                throw new HttpException('Статья не найдена', HttpStatus.NOT_FOUND);
            }

            await this.articlesRepository.destroy({ where: { id }, transaction });

            await transaction.commit();
            return { message: 'Статья успешно удалена' };
        } catch (error) {
            await transaction.rollback();
            throw new HttpException(
                {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Ошибка удаления статьи',
                    error: error.message,
                    details: error.errors || null,
                },
                HttpStatus.BAD_REQUEST
            );
        }
    }
}
