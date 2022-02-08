import { AccountEntity } from '@app/account/account.entity';
import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import {
  EMAIL_ALREADY_USED,
  NOT_FOUND_ERROR,
  CREDENTIALS_ERROR,
} from './auth.contants';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}
  async create(data: RegisterDto): Promise<AccountEntity> {
    const hashedPromise = this.hashedPassword(data.password);
    const accountPromise = this.accountRepository.findOne({
      email: data['email'],
    });
    const [hashed, account] = await Promise.all([
      hashedPromise,
      accountPromise,
    ]);
    if (account) {
      throw new HttpException(EMAIL_ALREADY_USED, HttpStatus.CONFLICT);
    }

    const preAccount = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    };
    const user = { password: hashed };
    const preUser = await this.userRepository.save(user);
    const newAccount = await this.accountRepository.save({
      ...preAccount,
      user: preUser,
    });
    delete newAccount.user.password;

    return newAccount;
  }

  async findByEmail(data: LoginDto): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne(
      {
        email: data['email'],
      },
      { relations: ['user'] },
    );

    if (!account) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_ACCEPTABLE);
    }

    const isCorrect = await this.comparedPassword(
      data.password,
      account.user.password,
    );
    if (!isCorrect) {
      throw new HttpException(CREDENTIALS_ERROR, HttpStatus.BAD_REQUEST);
    }
    delete account.user.password;
    return account;
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  async comparedPassword(
    currentPassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(currentPassword, oldPassword);
  }
}
