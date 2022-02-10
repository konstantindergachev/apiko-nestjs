export interface IItemCreateOrder {
  product_id: number;
  quantity: number;
}

export interface IShipmentCreateOrder {
  fullname: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}
