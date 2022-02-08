import { AuthService } from '@app/auth/auth.service';
import { CommonModule } from '@app/common/common.module';
import { UserEntity } from '@app/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountEntity } from './account.entity';
import { AccountService } from './account.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccountEntity, UserEntity]),
    CommonModule,
  ],
  controllers: [AccountController],
  providers: [AccountService, AuthService],
  exports: [AccountService],
})
export class AccountModule {}
