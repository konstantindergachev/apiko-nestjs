import { ICreateProduct } from '@app/product/interfaces/create-product.interface';
import { ProductEntity } from '@app/product/product.entity';
import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  IItemCreateOrder,
  IOrder,
  IOrderResponse,
} from './interfaces/create-order.interface';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { NOT_FOUND_ERROR, SAVED_SUCCESS } from './order.constants';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAll(
    user: UserEntity,
    query: IOrderAllQuery,
  ): Promise<{ order: OrderEntity }[]> {
    const { offset, limit } = query;

    const orders = await this.orderRepository.find({
      select: ['id', 'total', 'created_at'],
      relations: ['products', 'user'],
      where: { user },
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return orders.map((order) => {
      delete order.user.password;
      return { order };
    });
  }
  async getOne(id: number): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      relations: ['products', 'user'],
      where: { id },
    });

    if (!order) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    delete order.user.password;

    return order;
  }

  async create(
    user: UserEntity,
    order: CreateOrderDto,
  ): Promise<IOrderResponse> {
    const products = await Promise.all(
      order.items.map((item) => this.productRepository.findOne(item.productId)),
    );

    const savedOrder = await this.orderRepository.save({
      ...order,
      products,
      user,
    });
    const findOrder = await this.getOne(savedOrder.id);
    const findOrderItems = this.preResponseOrderItems(findOrder);
    findOrder.items = findOrderItems;
    delete findOrder.products;
    return { message: SAVED_SUCCESS, order: findOrder };
  }

  preResponseOrderItems(rawOrder: IOrder) {
    return rawOrder.items.map((item: IItemCreateOrder) => {
      rawOrder.products.forEach((product: ICreateProduct) => {
        item.product = product;
        if (product.id === item.productId) {
          item.orderedPrice = item.quantity * product.price;
        }
      });
      delete item.productId;
      return item;
    });
  }
}
