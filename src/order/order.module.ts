import { CommonModule } from '@app/common/common.module';
import { UserEntity } from '@app/user/user.entity';
import { UserService } from '@app/user/user.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, UserEntity]), CommonModule],
  controllers: [OrderController],
  providers: [OrderService, UserService],
  exports: [OrderService],
})
export class OrderModule {}
