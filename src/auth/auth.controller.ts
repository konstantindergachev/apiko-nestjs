import { UserEntity } from '@app/user/user.entity';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_CONFIRM_ERROR } from './auth.contants';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<UserEntity> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException(PASSWORD_CONFIRM_ERROR);
    }
    const user = await this.authService.create(body);
    return await this.preUserResponse(user);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto): Promise<UserEntity> {
    const user = await this.authService.findByEmail(body);
    return await this.preUserResponse(user);
  }

  private async preUserResponse(user: UserEntity): Promise<UserEntity> {
    const token = await this.jwtService.signAsync({ id: user.id });
    const response = { ...user, token };
    return response;
  }
}
