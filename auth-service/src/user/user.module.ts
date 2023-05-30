import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import * as process from "process";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./user.model";
import { JwtModule } from '@nestjs/jwt';
import { Role } from 'src/role/role.model';
import { RoleModule } from 'src/role/role.module';
import { UserRole } from 'src/role/user_role.model';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [
		SequelizeModule.forFeature([User, Role, UserRole]),
		RoleModule,
		JwtModule.register({
			secret: process.env.PRIVATE_KEY || 'SECRET',
			signOptions: {
				expiresIn: '12h'
			}
		})
	],
	exports: [UserService]
})
export class UserModule { }