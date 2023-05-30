import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from './dto/create_user.dto';
import { AddRoleDto } from './dto/add_role.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@MessagePattern('register')
	async register(@Payload() dto: CreateUserDto) {
		return await this.userService.register(dto)
	}

	@MessagePattern('login')
	async login(@Payload() dto: CreateUserDto) {
		return await this.userService.login(dto)
	}

	@MessagePattern('add_role')
	async addRole(@Payload() dto: AddRoleDto) {
        return this.userService.addRole(dto)
    }

	@MessagePattern('get_user_by_email')
	async getByEmail(@Payload() email: string) {
		return await this.userService.getUserByEmail(email)
	}

	@MessagePattern('get_all_users')
	async getAll() {
		return await this.userService.getAllUsers();
	}

	@MessagePattern('delete_user_by_email')
	async deleteByEmail(@Payload() data: { email: string}) {
		return await this.userService.deleteUserByEmail(data.email)
	}
}
