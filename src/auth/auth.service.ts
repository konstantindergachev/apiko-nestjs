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
  async create(data: RegisterDto): Promise<UserEntity> {
    const hashedPromise = this.hashedPassword(data.password);
    const userPromise = this.accountRepository.findOne({
      email: data['email'],
    });
    const [hashed, user] = await Promise.all([hashedPromise, userPromise]);
    if (user) {
      throw new HttpException(EMAIL_ALREADY_USED, HttpStatus.CONFLICT);
    }

    const newAccount = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    };
    const account = await this.accountRepository.save(newAccount);
    const preUser = { password: hashed, account };
    const savedUser = await this.userRepository.save(preUser);
    delete savedUser.password;

    return savedUser;
  }

  async findByEmail(data: LoginDto): Promise<UserEntity> {
    const account = await this.accountRepository.findOne({
      email: data['email'],
    });

    const user = await this.userRepository.findOne({ id: account.id });

    if (!user) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_ACCEPTABLE);
    }

    const isCorrect = await this.comparedPassword(data.password, user.password);
    if (!isCorrect) {
      throw new HttpException(CREDENTIALS_ERROR, HttpStatus.BAD_REQUEST);
    }
    delete user.password;
    return { ...user, account };
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
