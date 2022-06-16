import { AuthGuard } from '@app/auth/auth.guard';
import { IProductFavorites } from '@app/product/interfaces/product-query.interface';
import { Controller, Get, UseGuards, Query, Param } from '@nestjs/common';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @UseGuards(AuthGuard)
  @Get('favorites')
  async getAll(
    @Param('id') id: string,
    @Query() query: IProductFavorites,
  ): Promise<FavoriteEntity[]> {
    const favorites = await this.favoriteService.getFavorites(+id, query);
    return favorites;
  }
}
