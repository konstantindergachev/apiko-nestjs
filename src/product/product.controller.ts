import { AuthGuard } from '@app/auth/auth.guard';
import { FavoriteService } from '@app/favorite/favorite.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  IProductAllQuery,
  IProductByIdsQuery,
  IProductSearch,
} from './interfaces/product-query.interface';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly favoriteService: FavoriteService,
  ) {}

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

  @UseGuards(AuthGuard)
  @Get(':prodId/favorite')
  @HttpCode(200)
  async addToFavorite(@Param('prodId') prodId: string): Promise<object> {
    const product = await this.productService.getOne(prodId);
    await this.favoriteService.create(product);
    return { success: true };
  }

  @UseGuards(AuthGuard)
  @Delete(':prodId/favorite')
  async deleteFromFavorite(@Param('prodId') prodId: string): Promise<object> {
    const product = await this.productService.getOne(prodId);
    await this.favoriteService.remove(product);
    return { success: true };
  }
}
