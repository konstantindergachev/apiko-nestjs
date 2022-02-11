import { CommonModule } from '@app/common/common.module';
import { ProductEntity } from '@app/product/product.entity';
import { ProductService } from '@app/product/product.service';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, UserEntity, ProductEntity]),
    CommonModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, UserService, ProductService],
  exports: [OrderService],
})
export class OrderModule {}
