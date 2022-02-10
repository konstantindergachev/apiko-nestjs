import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IOrderAllQuery } from './interfaces/order-query.interface';
import { NOT_FOUND_ERROR } from './order.constants';
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
      relations: ['products', 'user', 'account'],
      skip: Number(offset),
      take: Number(limit),
      cache: true,
    });

    return orders;
  }
  async getOne(id: string): Promise<OrderEntity> {
    const order = await this.orderRepository.findOne({
      select: ['id', 'total'],
      relations: ['products', 'user', 'account'],
      where: { id },
    });

    if (!order) {
      throw new HttpException(NOT_FOUND_ERROR, HttpStatus.NOT_FOUND);
    }

    return order;
  }
}
