import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateChatMessageDto {
    @IsNotEmpty()
    @IsNumber()
    readonly chatId: number;

    @IsNotEmpty()
    @IsNumber()
    readonly userId: number;

    @IsNotEmpty()
    @IsString()
    readonly text: string;
}
