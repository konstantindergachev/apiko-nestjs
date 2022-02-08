import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProductQuery } from './interfaces/product-query.interface';
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

    return this.productRepository.find({
      select: ['id', 'title', 'price', 'picture', 'description', 'favorite'],
      order: {
        createdAt: sortType,
      },
      skip: Number(offset),
      take: Number(limit),
    });
  }
}
