import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { PASSWORD_CONFIRM_ERROR } from './auth.contants';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto): Promise<{ success: boolean }> {
    if (body.password !== body.password_confirm) {
      throw new BadRequestException(PASSWORD_CONFIRM_ERROR);
    }
    await this.authService.create(body);
    return { success: true };
  }
}
