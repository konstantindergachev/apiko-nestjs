import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  NOT_FOUND_ERROR,
  PRODUCT_ALREADY_FAVORITE_ERROR,
} from './favorite.constants';
import { FavoriteEntity } from './favorite.entity';
import { ProductEntity } from '@app/product/product.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
  ) {}

  async create(product: ProductEntity): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ product });
    if (favorite) {
      throw new HttpException(
        PRODUCT_ALREADY_FAVORITE_ERROR,
        HttpStatus.CONFLICT,
      );
    }
    await this.favoriteRepository.save({ product });
  }

  async remove(product: ProductEntity): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ product });
    if (!favorite) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete({ product });
  }
}
