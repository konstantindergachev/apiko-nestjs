import { AuthGuard } from '@app/auth/auth.guard';
import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';
import { AccountDto } from './dto/update-account.dto';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

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
}
