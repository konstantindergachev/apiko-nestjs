import { AccountEntity } from '@app/account/account.entity';
import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { EMAIL_ALREADY_USED } from './auth.contants';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}
  async create(data: RegisterDto): Promise<string> {
    const hashed = await this.hashedPassword(data.password);
    const user = await this.accountRepository.findOne({ email: data['email'] });
    if (user) {
      throw new HttpException(EMAIL_ALREADY_USED, HttpStatus.CONFLICT);
    }

    const preparedAccount = {
      fullname: data.fullname,
      email: data.email,
      phone: data.phone,
    };
    const account = await this.accountRepository.save(preparedAccount);
    const preparedUser = { password: hashed, account };
    const savedUser = await this.userRepository.save(preparedUser);
    delete savedUser.password;

    return hashed;
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
