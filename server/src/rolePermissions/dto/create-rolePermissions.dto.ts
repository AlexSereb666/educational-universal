import {IsNotEmpty} from "class-validator";

export class CreateRolePermissionsDto {
    @IsNotEmpty()
    @IsNotEmpty()
    readonly roleId: number;

    @IsNotEmpty()
    @IsNotEmpty()
    readonly permissionId: number;
}
