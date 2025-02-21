import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateUserRolesDto {
    @IsNotEmpty()
    @IsNumber()
    readonly roleId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}
