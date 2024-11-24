import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Articles} from "../articles/articles.model";
import {ArticleTypesLink} from "../articlesTypeLinks/articlesTypeLinks.model";

interface ArticlesTypeModelAttrs {
    name: string;
}

@Table({ tableName: 'articles_type' })
export class ArticlesType extends Model<ArticlesType, ArticlesTypeModelAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @BelongsToMany(() => Articles, () => ArticleTypesLink)
    articles: Articles[];
}
