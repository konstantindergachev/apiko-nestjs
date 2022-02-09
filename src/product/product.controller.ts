import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  IProductAllQuery,
  IProductByIdsQuery,
  IProductSearch,
} from './interfaces/product-query.interface';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() query: IProductAllQuery): Promise<ProductEntity[]> {
    return this.productService.getAll(query);
  }

  @Get('ids')
  async getByTds(@Query() query: IProductByIdsQuery): Promise<ProductEntity[]> {
    const ids = query.ids.split(',').map((id) => Number(id));
    return this.productService.getByIds(ids);
  }

  @Get('search')
  async search(@Query() query: IProductSearch): Promise<ProductEntity[]> {
    return this.productService.search(query);
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<ProductEntity> {
    return this.productService.getOne(id);
  }
}
