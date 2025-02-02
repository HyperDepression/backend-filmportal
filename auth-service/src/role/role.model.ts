import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { User } from "../user/user.model";
import { UserRole } from "./user_role.model";

interface RoleAttributes {
    name: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleAttributes> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[];
}