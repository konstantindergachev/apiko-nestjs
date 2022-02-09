import { NOT_FOUND_ERROR } from '@app/auth/auth.contants';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      select: ['id'],
      where: { id },
    });
    if (!user) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
