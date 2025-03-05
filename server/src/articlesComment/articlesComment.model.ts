import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Articles} from "../articles/articles.model";
import {User} from "../users/users.model";

interface ArticleCommentAttrs {
    id: number;
    text: string;
    date: Date;
    userId: number;
    articleId: number;
}

@Table({ tableName: 'article_comments' })
export class ArticleComment extends Model<ArticleComment, ArticleCommentAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.TEXT, allowNull: false })
    text: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    date: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Articles)
    @Column({ type: DataType.INTEGER, allowNull: false })
    articleId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;

    @BelongsTo(() => Articles, { onDelete: 'CASCADE', hooks: true })
    article: Articles;
}
