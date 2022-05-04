import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, Like } from 'typeorm';
import {
  IProductAllQuery,
  IProductSearch,
} from './interfaces/product-query.interface';
import { NOT_FOUND_ERROR } from './product.constants';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(query: IProductAllQuery): Promise<ProductEntity[]> {
    const { offset, limit, sortBy } = query;
    const sortType = sortBy === 'latest' ? 'DESC' : 'ASC';

    const products = await this.productRepository.find({
      relations: ['category'],
      order: {
        created_at: sortType,
      },
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return products;
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

  async getByIds(ids: number[]): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
      where: { id: In(ids) },
    });

    return products.map((product) => {
      delete product.category.products;
      return product;
    });
  }

  async search(query: IProductSearch): Promise<ProductEntity[]> {
    const { keywords, offset, limit } = query;
    const products = await this.productRepository.find({
      relations: ['category'],
      where: { title: Like(`%${keywords}%`) },
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });
    return products.map((product) => {
      delete product.category.products;
      return product;
    });
  }

  async getAllByCategory(id: number): Promise<ProductEntity[]> {
    const products = await this.productRepository.find({
      relations: ['category'],
    });

    const findProducts = products.filter(
      (product) => product.category.id === id && product,
    );
    return findProducts;
  }
}
