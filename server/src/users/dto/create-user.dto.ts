import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  readonly login: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsOptional()
  @IsString()
  readonly email?: string;

  @IsOptional()
  @IsBoolean()
  readonly isActivated?: boolean;

  @IsOptional()
  @IsString()
  readonly activationLink?: string;

  @IsOptional()
  @IsString()
  readonly jsonSettings?: string;
}
