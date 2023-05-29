import { Controller } from '@nestjs/common';
import { RoleService } from "./role.service";
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateRoleDto } from "./dto/create_role.dto";

@Controller('roles')
export class RoleController {
    constructor(private roleService: RoleService) { }

    @MessagePattern('create_role')
    create(@Payload() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @MessagePattern('get_role_by_name')
    getByname(@Payload() name: string) {
        return this.roleService.getRoleByName(name);
    }

    @MessagePattern('get_all_roles')
    getAll() {
        return this.roleService.getAllRoles();
    }

    @MessagePattern('delete_role_by_name')
    deleteByName(@Payload() name: string) {
        return this.roleService.deleteRoleByName(name);
    }
}