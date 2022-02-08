import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductQuery } from './interfaces/product-query.interface';
import { NOT_FOUND_ERROR } from './product.constants';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(query: IProductQuery): Promise<ProductEntity[]> {
    const { offset, limit, sortBy } = query;
    const sortType = sortBy === 'latest' ? 'DESC' : 'ASC';

    const products = await this.productRepository.find({
      relations: ['category'],
      order: {
        createdAt: sortType,
      },
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return products.map((product) => {
      delete product.createdAt;
      delete product.updatedAt;
      delete product.category.products;
      return product;
    });
  }

  async getOne(id: string): Promise<ProductEntity> {
    const product = await this.productRepository.findOne({
      select: ['id', 'title', 'price', 'picture', 'description', 'favorite'],
      relations: ['category'],
      where: { id },
    });

    if (!product) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    delete product.category.products;

    return product;
  }
}
