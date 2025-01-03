import {Column, DataType, Model, Table} from "sequelize-typescript";

interface UserCreationAttrs {
    login: string;
    password: string;
    email: string;
    isActivated: boolean;
    activationLink: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    login: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    isActivated: boolean;

    @Column({type: DataType.STRING})
    activationLink: string;
}
