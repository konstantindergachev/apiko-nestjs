import { IsNotEmpty } from 'class-validator';
import {
  IItemCreateOrder,
  IShipmentCreateOrder,
} from '../interfaces/create-order.interface';

export class CreateOrderDto {
  @IsNotEmpty()
  items: IItemCreateOrder[];

  @IsNotEmpty()
  shipment: IShipmentCreateOrder;
}
