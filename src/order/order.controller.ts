import { AuthGuard } from '@app/auth/auth.guard';
import { ProductEntity } from '@app/product/product.entity';
import { ProductService } from '@app/product/product.service';
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
import {
  IItemCreateOrder,
  IOrderResponse,
} from './interfaces/create-order.interface';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  async getAll(
    @Param('id') id: string,
    @Query() query: IOrderAllQuery,
  ): Promise<OrderEntity[]> {
    const user = await this.userService.findById(id);
    return this.orderService.getAll(user, query);
  }

  @Get(':orderId')
  async getOne(@Param('orderId') orderId: string) {
    return this.orderService.getOne(+orderId);
  }

  @Post()
  @HttpCode(200)
  async create(
    @Param('id') id: string,
    @Body() body: CreateOrderDto,
  ): Promise<IOrderResponse> {
    const user = await this.userService.findById(id);

    const prodIds = body.items.map((item) => item.productId);

    const products = await this.productService.getByIds(prodIds);
    const total = this.calcTotal(products, body.items);

    const order = {
      total,
      items: body.items,
      shipment: body.shipment,
    };
    return await this.orderService.create(user, order);
  }

  private calcTotal(
    products: ProductEntity[],
    items: IItemCreateOrder[],
  ): number {
    let total = 0;
    products.map((product: ProductEntity) => {
      items.map((item) => {
        if (product.id === item.productId) {
          total += Number(product.price) * item.quantity;
        }
      });
    });

    return Math.ceil(total);
  }
}
