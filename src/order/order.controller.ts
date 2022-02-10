import { AuthGuard } from '@app/auth/auth.guard';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(@Query() query: IOrderAllQuery): Promise<OrderEntity[]> {
    return this.orderService.getAll(query);
  }
}
