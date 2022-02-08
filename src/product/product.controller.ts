import { Controller, Get } from '@nestjs/common';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(): Promise<ProductEntity[]> {
    return this.productService.getAll();
  }
}
