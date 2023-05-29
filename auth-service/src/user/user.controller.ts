import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from "@nestjs/microservices";
import { CreateUserDto } from './dto/create_user.dto';

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {
	}

	@MessagePattern('register')
	async create(@Payload() dto: CreateUserDto) {
		return await this.userService.register(dto)
	}

	@MessagePattern('login')
	async login(@Payload() dto: CreateUserDto) {
		return await this.userService.login(dto)
	}

	@MessagePattern('get_user_by_id')
	getUserById(@Payload() id: number) {
		return this.userService.getUserById(id)
	}

	@MessagePattern('get_user_by_email')
	async getByEmail(@Payload() email: string) {
		return await this.userService.getUserByEmail(email)
	}

	@MessagePattern('get_all_users')
	async getAll() {
		return await this.userService.getAllUsers();
	}

	@MessagePattern('delete_user')
	async deleteById(@Payload() data: { id: number }) {
		return await this.userService.deleteUserById(data.id)
	}
}
