import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Articles} from "../articles/articles.model";
import {ArticlesTypeBlock} from "../articlesTypeBlock/articlesTypeBlock.model";

interface articlesBlockAttrs {
    step: number;
    content: string;
    title: string;
}

@Table({ tableName: 'articles_block' })
export class ArticlesBlock extends Model<ArticlesBlock, articlesBlockAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    content: string;

    @Column({ type: DataType.STRING, allowNull: false })
    title: string;

    @ForeignKey(() => Articles)
    @Column({type: DataType.INTEGER})
    articleId: number;

    @BelongsTo(() => Articles)
    article: Articles;

    @ForeignKey(() => ArticlesTypeBlock)
    @Column({type: DataType.INTEGER})
    typeBlockId: number;

    @BelongsTo(() => ArticlesTypeBlock)
    typeBlock: ArticlesTypeBlock;
}

