import { Body, Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create_user.dto';
import { AddRoleDto } from './dto/add_role.dto';
import { AuthService } from './auth.service';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from '../guard/roles_auth.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post('/register')
    async register(@Body() dto: CreateUserDto) {
        return await this.authService.register(dto)
    }

    @Post('/login')
    async login(@Body() dto: CreateUserDto) {
        return await this.authService.login(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Put('/user/role')
    async addRole(@Body() dto: AddRoleDto) {
        return await this.authService.addRole(dto)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/user')
    async getUserByEmail(@Body() data: { email: string }) {
        return await this.authService.getUserByEmail(data.email)
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Get('/user/all')
    async getAll() {
        return await this.authService.getAll()
    }

    @Roles("ADMIN")
    @UseGuards(RolesGuard)
    @Delete('/user')
    async deleteUserByEmail(@Body() data: { email: string }) {
        return await this.authService.deleteUserByEmail(data.email)
    }
}
