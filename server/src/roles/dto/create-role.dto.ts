import {IsNotEmpty, IsString} from "class-validator";

export class CreateRoleDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly slug: string;
}
