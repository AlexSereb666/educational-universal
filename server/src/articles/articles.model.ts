import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ArticlesType} from "../articlesType/articlesType.model";
import {ArticleTypesLink} from "../articlesTypeLinks/articlesTypeLinks.model";
import {ArticlesBlock} from "../articlesBlock/articlesBlock.model";

interface ArticlesModelAttrs {
    id: number;
    title: string;
    subtitle: string;
    img: string;
    view: number;
    createdAt: Date;
    updatedAt: Date;
}

@Table({tableName: 'articles'})
export class Articles extends Model<Articles, ArticlesModelAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    subtitle: string;

    @Column({type: DataType.STRING})
    img: string;

    @Column({type: DataType.INTEGER, allowNull: false})
    view: number;

    @Column({type: DataType.DATE, allowNull: false})
    createdAt: Date;

    @Column({type: DataType.DATE, allowNull: false})
    updatedAt: Date;

    @BelongsToMany(() => ArticlesType, () => ArticleTypesLink)
    types: ArticlesType[];

    @HasMany(() => ArticlesBlock)
    blocks: ArticlesBlock[];
}
