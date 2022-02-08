import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  ADDRESS_ERROR,
  CITY_ERROR,
  COUNTRY_ERROR,
  NOT_FOUND_ERROR,
  UPDATED_SUCCESS,
} from './account.constants';
import { AccountEntity } from './account.entity';
import { AccountDto } from './dto/update-account.dto';

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

  async findByIdAndUpdate(id: number, data: AccountDto): Promise<object> {
    if (!data.country) {
      throw new HttpException(COUNTRY_ERROR, HttpStatus.CONFLICT);
    }
    if (!data.city) {
      throw new HttpException(CITY_ERROR, HttpStatus.CONFLICT);
    }
    if (!data.address) {
      throw new HttpException(ADDRESS_ERROR, HttpStatus.CONFLICT);
    }
    const account = await this.accountRepository.update(id, data);

    if (!account) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    return { message: UPDATED_SUCCESS };
  }
}
