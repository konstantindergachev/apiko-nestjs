import { CommonModule } from '@app/common/common.module';
import { FavoriteEntity } from '@app/favorite/favorite.entity';
import { FavoriteService } from '@app/favorite/favorite.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from './product.controller';
import { ProductEntity } from './product.entity';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProductEntity, FavoriteEntity]),
    CommonModule,
  ],
  controllers: [ProductController],
  providers: [ProductService, FavoriteService],
  exports: [ProductService],
})
export class ProductModule {}
