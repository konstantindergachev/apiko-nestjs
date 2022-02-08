import { IsString, IsNotEmpty } from 'class-validator';

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
