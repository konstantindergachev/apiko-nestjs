import { AccountEntity } from '@app/account/account.entity';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PASSWORD_CONFIRM_ERROR, USER_LOGOUT } from './auth.contants';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { IUserResponse } from './interfaces/user-response.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<IUserResponse> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException(PASSWORD_CONFIRM_ERROR);
    }
    const account = await this.authService.create(body);
    return await this.preUserResponse(account);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() body: LoginDto): Promise<IUserResponse> {
    const account = await this.authService.findByEmail(body);
    return await this.preUserResponse(account);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  @HttpCode(200)
  logout(): { message: string } {
    return { message: USER_LOGOUT };
  }

  private async preUserResponse(
    account: AccountEntity,
  ): Promise<IUserResponse> {
    const token = await this.jwtService.signAsync({ id: account.user.id });
    return { account, token };
  }
}
