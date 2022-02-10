import { AuthGuard } from '@app/auth/auth.guard';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAll(@Query() query: IOrderAllQuery): Promise<OrderEntity[]> {
    return this.orderService.getAll(query);
  }

  @Get(':orderId')
  async getOne(@Param('orderId') orderId: string): Promise<OrderEntity> {
    return this.orderService.getOne(orderId);
  }
}
