import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PRODUCT_ALREADY_FAVORITE_ERROR } from './favorite.constants';
import { FavoriteEntity } from './favorite.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async create(id: number): Promise<string> {
    console.log('create repo favorite id', id); //FIXME:

    const favorite = await this.favoriteRepository.findOne(id);
    if (favorite) {
      throw new HttpException(
        PRODUCT_ALREADY_FAVORITE_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    const result = await this.favoriteRepository.save({ id });
    console.log('create repo favorite result', result); //FIXME:

    return 'from favorite repo';
  }
}
