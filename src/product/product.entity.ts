import { CategoryEntity } from '@app/category/category.entity';
import { FavoriteEntity } from '@app/favorite/favorite.entity';
import { OrderEntity } from '@app/order/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  price: number;

  @Column({ default: '' })
  picture: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  favorite: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @Column({
    select: false,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product)
  favorites: FavoriteEntity[];

  @ManyToMany(() => OrderEntity, (order) => order.products)
  orders: OrderEntity[];
}
