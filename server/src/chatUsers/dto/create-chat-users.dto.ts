import {IsNotEmpty, IsNumber} from "class-validator";

export class CreateChatUsersDto {
    @IsNotEmpty()
    @IsNumber()
    readonly chatId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;
}
