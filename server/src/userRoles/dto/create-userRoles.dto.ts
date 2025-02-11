import {IsNotEmpty} from "class-validator";

export class CreateUserRolesDto {
    @IsNotEmpty()
    @IsNotEmpty()
    readonly roleId: number;

    @IsNotEmpty()
    @IsNotEmpty()
    readonly userId: number;
}
