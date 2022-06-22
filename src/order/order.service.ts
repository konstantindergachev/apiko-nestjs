import { UserEntity } from '@app/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { IOrderAllQuery } from './interfaces/order-query.interface';
// import { OrderProductEntity } from './order-product.entity';
import { NOT_FOUND_ERROR, SAVED_SUCCESS } from './order.constants';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAll(query: IOrderAllQuery): Promise<OrderEntity[]> {
    const { offset, limit } = query;

    const orders = await this.orderRepository.find({
      select: ['id', 'total'],
      relations: ['products', 'user'],
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return orders.map((order) => {
      delete order.user.password;
      return order;
    });
  }
  async getOne(id: string): Promise<OrderEntity> {
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

  async create(user: UserEntity, order: CreateOrderDto): Promise<object> {
    const preSave = { ...order, user };
    await this.orderRepository.save({ ...preSave });
    return { message: SAVED_SUCCESS };
  }
}
