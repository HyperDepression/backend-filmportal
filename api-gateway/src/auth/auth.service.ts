import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from "@nestjs/microservices";
import { catchError, firstValueFrom, throwError, timeout } from "rxjs";
import { CreateUserDto } from './dto/create_user.dto';
import { AddRoleDto } from './dto/add_role.dto';

@Injectable()
export class AuthService {
	constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientProxy) {
		this.authClient.connect()
	}

	async register(dto: CreateUserDto) {
		return await firstValueFrom(this.authClient.send('register', dto)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

	async login(dto: CreateUserDto) {
		return await firstValueFrom(this.authClient.send('login', dto)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

	async addRole(dto: AddRoleDto) {
		return await firstValueFrom(this.authClient.send('add_role', dto)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

	async getUserByEmail(email: string) {
		return await firstValueFrom(this.authClient.send('get_user_by_email', email)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

	async getAll() {
		return await firstValueFrom(this.authClient.send('get_all_users', '')
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

	async deleteUserByEmail(email: string) {
		return await firstValueFrom(this.authClient.send('delete_user_by_email', email)
			.pipe(timeout({
				each: 2000,
				with: () => throwError(() => new HttpException('GATEWAY TIMEOUT', HttpStatus.GATEWAY_TIMEOUT))
			}),
				catchError((error) => {
					return throwError(() => new HttpException(error.message, error.status));
				})
			)
		)
	}

}
