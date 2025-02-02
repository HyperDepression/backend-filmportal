import { Role } from "src/role/role.model";

export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly roles?: Role[];
}