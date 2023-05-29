import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { RoleModule } from "./role/role.module";
import { ConfigModule } from "@nestjs/config";
import { User } from "./user/user.model";
import { Role } from "./role/role.model";
import { UserRole } from "./role/user_role.model";

@Module({
    controllers: [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
			envFilePath: `.${process.env.NODE_ENV}.env`,
		}),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [User, Role, UserRole],
            autoLoadModels: true,
            omitNull: false
        }),
        UserModule,
        RoleModule
    ]
})
export class AuthModule { }