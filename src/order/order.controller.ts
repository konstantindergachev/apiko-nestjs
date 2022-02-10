import { AuthGuard } from '@app/auth/auth.guard';
import { UserService } from '@app/user/user.service';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async getAll(@Query() query: IOrderAllQuery): Promise<OrderEntity[]> {
    return this.orderService.getAll(query);
  }

  @Get(':orderId')
  async getOne(@Param('orderId') orderId: string) {
    return this.orderService.getOne(orderId);
  }

  @Post()
  @HttpCode(200)
  async create(
    @Param('id') id: string,
    @Body() body: CreateOrderDto,
  ): Promise<OrderEntity> {
    const user = await this.userService.findById(id);
    return await this.orderService.create(user, body);
  }
}
