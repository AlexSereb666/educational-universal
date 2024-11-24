import {Column, DataType, Model, Table} from "sequelize-typescript";

interface articlesTypeBlockAttrs {
    name: string;
}

@Table({ tableName: 'articles_type_block' })
export class ArticlesTypeBlock extends Model<ArticlesTypeBlock, articlesTypeBlockAttrs> {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;
}
