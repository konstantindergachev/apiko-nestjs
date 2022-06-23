export interface ICreateProduct {
  id: number;
  title: string;
  price: number;
  picture: string;
  description: string;
  favorite: boolean;
  created_at: Date;
}
