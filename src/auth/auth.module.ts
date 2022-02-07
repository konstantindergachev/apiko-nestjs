import { AccountEntity } from '@app/account/account.entity';
import { UserEntity } from '@app/user/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AccountEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
