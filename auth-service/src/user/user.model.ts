import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { UserRole } from "../role/user_role.model";
import { Role } from "../role/role.model";

interface IUser {
	id: number
	email: string
	password: string
	banned: boolean
	profileId: number
}

@Table({ tableName: 'users' })
export class User extends Model<User, IUser> {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	email: string

	@Column({
		type: DataType.STRING,
		allowNull: false,
		unique: true
	})
	password: string

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	banned: boolean;

	@Column({ type: DataType.INTEGER })
	profileId: number;

	@BelongsToMany(() => Role, () => UserRole)
	roles: Role[];
}