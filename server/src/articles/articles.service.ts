import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectConnection, InjectModel} from "@nestjs/sequelize";
import {Articles} from "./articles.model";
import {ArticlesType} from "../articlesType/articlesType.model";
import {ArticlesBlock} from "../articlesBlock/articlesBlock.model";
import {Sequelize} from "sequelize";
import {CreateArticlesDto} from "./dto/create-articles.dto";
import {ArticlesTypeBlock} from "../articlesTypeBlock/articlesTypeBlock.model";

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
}
