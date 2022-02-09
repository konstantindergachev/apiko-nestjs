import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoriteController } from './favorite.controller';
import { FavoriteEntity } from './favorite.entity';
import { FavoriteService } from './favorite.service';

@Module({
  imports: [TypeOrmModule.forFeature([FavoriteEntity])],
  controllers: [FavoriteController],
  providers: [FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
