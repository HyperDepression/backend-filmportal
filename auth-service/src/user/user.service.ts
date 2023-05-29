import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { User } from "./user.model";
import { CreateUserDto } from './dto/create_user.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private readonly userRepository: typeof User,
		private jwtService: JwtService) {
	}

	async register(dto: CreateUserDto) {
		let candidate = this.getUserByEmail(dto.email)
		if (candidate) {
			throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST);
		}
		const hashPassword: string = await bcrypt.hash(dto.password, 5);
		const user = await this.userRepository.create({ email: dto.email, password: hashPassword })
		return this.generateToken(user)
	}

	async login(dto: CreateUserDto) {
		const user = await this.validateUser(dto)
		return this.generateToken(user)
	}

	async getUserById(id) {
		const user = await this.userRepository.findByPk(id)
		return user
	}

	async getAllUsers() {
		return await this.userRepository.findAll()
	}

	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({ where: { email } })
		return user
	}

	async deleteUserById(profileId: number) {
		return await this.userRepository.destroy({ where: { profileId } })
	}

	async generateToken(user: User) {
		const payload = { email: user.email, id: user.id }
		return {
			token: this.jwtService.sign(payload)
		}
	}

	async validateUser(userDto: CreateUserDto) {
		const user = await this.getUserByEmail(userDto.email);
		const passwordEquals = await bcrypt.compare(userDto.password, user.password);
		if (user && passwordEquals) {
			return user;
		}
		throw new UnauthorizedException({ message: 'Некорректный емайл или пароль' })
	}
}
