import { ProductEntity } from '@app/product/product.entity';
import { Controller, Get, Param } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getAll(): Promise<CategoryEntity[]> {
    return this.categoryService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ProductEntity[]> {
    const productsByCategory = await this.categoryService.getOne(id);
    return productsByCategory;
  }
}
