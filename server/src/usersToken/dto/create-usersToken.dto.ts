import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateUsersTokenDto {
    @IsNotEmpty()
    @IsString()
    readonly refreshToken: string;

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}
