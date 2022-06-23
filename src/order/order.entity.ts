import { ProductEntity } from '@app/product/product.entity';
import { UserEntity } from '@app/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  total: number;

  @Column('jsonb', { nullable: true })
  items: object[];

  @Column('simple-json', { nullable: true })
  shipment: {
    fullname: string;
    phone: string;
    country: string;
    city: string;
    address: string;
  };

  @Column({
    select: false,
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

  @ManyToMany(() => ProductEntity, (product) => product.orders, {
    createForeignKeyConstraints: true,
    cascade: true,
  })
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'orders_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'products_id', referencedColumnName: 'id' },
  })
  products: ProductEntity[];

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
