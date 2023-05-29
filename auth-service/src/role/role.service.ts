import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize";
import { CreateRoleDto } from "./dto/create_role.dto";
import { Role } from "./role.model";

@Injectable()
export class RoleService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) { }

    async createRole(dto: CreateRoleDto) {
        return await this.roleRepository.create(dto)
    }

    async getRoleByName(name: string) {
        return await this.roleRepository.findOne({ where: { name } })
    }

    async getAllRoles() {
        return await this.roleRepository.findAll()
    }

    async deleteRoleByName(name: string) {
        return await this.roleRepository.destroy({ where: { name } })
    }
}