export interface IItemCreateOrder {
  productId: number;
  quantity: number;
}

export interface IShipmentCreateOrder {
  fullname: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}
