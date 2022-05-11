import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NOT_FOUND_ERROR } from './category.constants';
import { CategoryEntity } from './category.entity';
import { ProductService } from '@app/product/product.service';
import { ProductEntity } from '@app/product/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    private readonly productService: ProductService,
  ) {}

  async getAll(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.find();
  }

  async getOne(id: string): Promise<ProductEntity[]> {
    if (id === '0') {
      const query = { offset: '0', limit: '20', sortBy: 'latest' };
      return await this.productService.getAll(query);
    }

    const category = await this.categoryRepository.findOne(id);

    if (!category) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    const productsByCategory = await this.productService.getAllByCategory(
      parseInt(id),
    );
    return productsByCategory;
  }
}
