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
export interface IOrderResponse {
  message: string;
  order: {
    id: number;
    total: number;
    items: IItemCreateOrder[];
    shipment: IShipmentCreateOrder;
    user: { id: number };
  };
}
