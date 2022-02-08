import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_FOUND_ERROR } from './account.constants';
import { AccountEntity } from './account.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
  ) {}

  async findById(id: number): Promise<AccountEntity> {
    const account = await this.accountRepository.findOne({
      select: [
        'id',
        'fullname',
        'email',
        'phone',
        'country',
        'city',
        'address',
      ],
      where: { id },
    });
    if (!account) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    delete account.user;
    return account;
  }
}
