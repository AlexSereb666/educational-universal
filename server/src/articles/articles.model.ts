import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, Model, Table} from "sequelize-typescript";
import {ArticlesType} from "../articlesType/articlesType.model";
import {ArticleTypesLink} from "../articlesTypeLinks/articlesTypeLinks.model";
import {ArticlesBlock} from "../articlesBlock/articlesBlock.model";
import {ArticlesTypeBlock} from "../articlesTypeBlock/articlesTypeBlock.model";
import {User} from "../users/users.model";

interface CreateArticlesAttrs {
    title: string;
    subtitle: string;
    img: string;
    view: number;
    userId: number;
}

interface ArticlesModelAttrs extends CreateArticlesAttrs {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

@Table({ tableName: 'articles' })
export class Articles extends Model<Articles, CreateArticlesAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @Column({ type: DataType.STRING, allowNull: false })
    subtitle: string;

    @Column({ type: DataType.STRING })
    img: string;

    @Column({ type: DataType.INTEGER, allowNull: false })
    view: number;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt: Date;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    updatedAt: Date;

    @BelongsToMany(() => ArticlesType, () => ArticleTypesLink)
    types: ArticlesType[];

    @HasMany(() => ArticlesBlock)
    blocks: ArticlesBlock[];

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;
}
