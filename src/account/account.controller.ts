import { AuthGuard } from '@app/auth/auth.guard';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@UseGuards(AuthGuard)
@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccount(@Param('id') id: number): Promise<AccountEntity> {
    return await this.accountService.findById(id);
  }
}
