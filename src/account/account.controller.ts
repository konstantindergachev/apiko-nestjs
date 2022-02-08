import { AuthGuard } from '@app/auth/auth.guard';
import { AuthService } from '@app/auth/auth.service';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { AccountDto } from './dto/update-account.dto';
import { PasswordDto } from './dto/update-password.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async getAccount(@Param('id') id: number): Promise<AccountEntity> {
    return await this.accountService.findById(id);
  }

  @Put()
  async updateAccount(
    @Param('id') id: number,
    @Body() body: AccountDto,
  ): Promise<object> {
    return await this.accountService.findByIdAndUpdate(id, body);
  }

  @Put('password')
  async updatePassword(
    @Param('id') id: number,
    @Body() body: PasswordDto,
  ): Promise<object> {
    return await this.authService.changePassword(id, body);
  }
}
