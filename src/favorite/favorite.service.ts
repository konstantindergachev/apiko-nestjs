import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  NOT_FOUND_ERROR,
  ONE_OF_PRODUCT_ALREADY_FAVORITE_ERROR,
  PRODUCT_ALREADY_FAVORITE_ERROR,
} from './favorite.constants';
import { PRODUCT_NOT_FOUND_ERROR } from '../product/product.constants';
import { FavoriteEntity } from './favorite.entity';
import { ProductEntity } from '@app/product/product.entity';
import { IProductFavorites } from '@app/product/interfaces/product-query.interface';
import { UserEntity } from '@app/user/user.entity';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(FavoriteEntity)
    private readonly favoriteRepository: Repository<FavoriteEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async create(user: UserEntity, product: ProductEntity): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ product });
    if (favorite) {
      throw new HttpException(
        PRODUCT_ALREADY_FAVORITE_ERROR,
        HttpStatus.CONFLICT,
      );
    }
    const preSave = { product, user };
    await this.favoriteRepository.save({ ...preSave });
    const findProduct = await this.productRepository.findOne({
      id: product.id,
    });
    if (!findProduct) {
      throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    findProduct.favorite = true;
    await this.productRepository.save(findProduct);
  }

  async remove(product: ProductEntity): Promise<void> {
    const favorite = await this.favoriteRepository.findOne({ product });
    if (!favorite) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }
    await this.favoriteRepository.delete({ product });
    const findProduct = await this.productRepository.findOne({
      id: product.id,
    });
    if (!findProduct) {
      throw new HttpException(PRODUCT_NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    findProduct.favorite = false;
    await this.productRepository.save(findProduct);
  }

  async getFavorites(query: IProductFavorites): Promise<FavoriteEntity[]> {
    const { offset, limit } = query;
    const favorites = await this.favoriteRepository.find({
      relations: ['product'],
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return favorites;
  }
  async createMany(
    ids: number[],
    products: ProductEntity[],
    user: UserEntity,
  ): Promise<number[]> {
    const favorites = await this.favoriteRepository.find({
      where: { product: In(ids) },
    });
    if (favorites.length) {
      throw new HttpException(
        ONE_OF_PRODUCT_ALREADY_FAVORITE_ERROR,
        HttpStatus.CONFLICT,
      );
    }

    for await (const product of products) {
      const preSave = { product, user };
      this.favoriteRepository.save({ ...preSave });
    }

    return ids;
  }
}
