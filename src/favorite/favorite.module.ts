import { CommonModule } from '@app/common/common.module';
import { ProductEntity } from '@app/product/product.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FavoriteEntity, ProductEntity]),
    CommonModule,
  ],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
