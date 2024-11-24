import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Articles} from "../articles/articles.model";
import {ArticlesType} from "../articlesType/articlesType.model";

interface ArticleTypesLinkAttrs {
    id: number;
    articleId: number;
    typeId: number;
}

@Table({ tableName: 'article_type_links' })
export class ArticleTypesLink extends Model<ArticleTypesLink, ArticleTypesLinkAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Articles)
    @Column({ type: DataType.INTEGER, allowNull: false })
    articleId: number;

    @ForeignKey(() => ArticlesType)
    @Column({ type: DataType.INTEGER, allowNull: false })
    typeId: number;
}
