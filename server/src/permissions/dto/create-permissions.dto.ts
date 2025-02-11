import {IsNotEmpty, IsString} from "class-validator";

export class CreatePermissionDto {
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly slug: string;
}
