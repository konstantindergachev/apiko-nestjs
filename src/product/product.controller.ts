import { AuthGuard } from '@app/auth/auth.guard';
import { FavoriteEntity } from '@app/favorite/favorite.entity';
import { FavoriteService } from '@app/favorite/favorite.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorites.dto';
import {
  IProductAllQuery,
  IProductByIdsQuery,
  IProductFavorites,
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

  @UseGuards(AuthGuard)
  @Get('favorites')
  async getFavorites(
    @Query() query: IProductFavorites,
  ): Promise<FavoriteEntity[]> {
    return this.favoriteService.getFavorites(query);
  }

  @UseGuards(AuthGuard)
  @Post('favorites')
  @HttpCode(200)
  async createFavorites(@Body() body: CreateFavoriteDto): Promise<number[]> {
    const products = await this.productService.getByIds(body.ids);
    return this.favoriteService.createMany(body.ids, products);
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
