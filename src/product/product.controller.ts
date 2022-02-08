import { Controller, Get, Query } from '@nestjs/common';
import { IProductQuery } from './interfaces/product-query.interface';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() query: IProductQuery): Promise<ProductEntity[]> {
    return this.productService.getAll(query);
  }
}
