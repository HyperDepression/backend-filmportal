import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from './dto/create_user.dto';
import { AddRoleDto } from './dto/add_role.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userRepository: typeof User,
		private roleService: RoleService,
		private jwtService: JwtService) {
	}

	async register(dto: CreateUserDto) {
		let candidate = this.getUserByEmail(dto.email)
		if (candidate) {
			throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
		}
		const hashPassword: string = await bcrypt.hash(dto.password, 5)
		const user = await this.userRepository.create({ email: dto.email, password: hashPassword })
		await this.addRole({ userId: user.id, roleName: 'USER' })
		return this.generateToken({ ...user })
	}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		return this.generateToken({ ...user })
	}

	async addRole(dto: AddRoleDto) {
		const user = await this.userRepository.findByPk(dto.userId);
		const role = await this.roleService.getRoleByName(dto.roleName)
		if (role && user) {
			await user.$add('role', role.id)
			return { user, role }
		}
		throw new HttpException('Пользователь или роль не найдены', HttpStatus.NOT_FOUND);
	}

	async getAllUsers() {
		return await this.userRepository.findAll()
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email } })
		return user
	}

	async deleteUserByEmail(email: string) {
		return await this.userRepository.destroy({ where: { email } })
	}

	async generateToken(dto: CreateUserDto) {
		return {
			token: this.jwtService.sign(dto)
		}
	}

	async validateUser(userDto: CreateUserDto) {
		const user = await this.getUserByEmail(userDto.email);
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
	}
}
