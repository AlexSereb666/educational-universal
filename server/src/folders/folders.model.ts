import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    Model,
    Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface CreateFoldersAttrs {
    userId: number;
    name: string;
    parentId?: number;
    createdAt: Date;
}

@Table({ tableName: 'folders' })
export class Folders extends Model<Folders, CreateFoldersAttrs> {
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false })
    name: string;

    @Column({ type: DataType.DATE, allowNull: false, defaultValue: DataType.NOW })
    createdAt: Date;

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER })
    userId: number;

    @BelongsTo(() => User, { onDelete: 'CASCADE', hooks: true })
    user: User;

    @ForeignKey(() => Folders)
    @Column({ type: DataType.INTEGER, allowNull: true })
    parentId: number | null;

    @BelongsTo(() => Folders, { onDelete: 'CASCADE', hooks: true }) // Если удалить папку, вложенные удалятся
    parent: Folders;

    @HasMany(() => Folders)
    subfolders: Folders[];
}
