import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { Folders } from '../folders/folders.model';

interface CreateFilesAttrs {
    userId: number;
    folderId?: number; // Может быть NULL, если файл лежит в корне
    name: string;
    size: number;
    mimeType: string;
    storagePath: string;
    createdAt: Date;
}

@Table({ tableName: 'files' })
export class Files extends Model<Files, CreateFilesAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.BIGINT, allowNull: false })
    size: number;

    @Column({ type: DataType.STRING, allowNull: false })
    mimeType: string;

    @Column({ type: DataType.TEXT, allowNull: false })
    storagePath: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;

    @ForeignKey(() => Folders)
    @Column({ type: DataType.INTEGER, allowNull: true })
    folderId: number | null;

    @BelongsTo(() => Folders, { onDelete: 'CASCADE', hooks: true })
    folder: Folders;
}
