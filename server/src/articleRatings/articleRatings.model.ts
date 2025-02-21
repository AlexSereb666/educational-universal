import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../users/users.model";
import {Articles} from "../articles/articles.model";

interface ArticleRatingsAttrs {
    userId: number;
    articleId: number;
    score: number;
    feedback: string;
}

@Table({ tableName: 'article_ratings'})
export class ArticleRatings extends Model<ArticleRatings, ArticleRatingsAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Articles)
    @Column({ type: DataType.INTEGER, allowNull: false })
    articleId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    score: number;

    @Column({ type: DataType.TEXT })
    feedback: string;
}
