import { ICreateProduct } from '@app/product/interfaces/create-product.interface';

export interface IItemCreateOrder {
  productId?: number;
  quantity?: number;
  orderedPrice?: number;
  product?: ICreateProduct;
}

export interface IShipmentCreateOrder {
  fullname: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}
export interface IOrder {
  id: number;
  total: number;
  products: ICreateProduct[];
  items: IItemCreateOrder[];
  shipment: IShipmentCreateOrder;
  user: { id: number };
}
export interface IOrderResponse {
  message: string;
  order: IOrder;
}
