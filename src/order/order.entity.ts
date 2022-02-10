import { AccountEntity } from '@app/account/account.entity';
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

  @ManyToOne(() => UserEntity, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'owner_id' })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders, {
    createForeignKeyConstraints: false,
    cascade: true,
  })
  @JoinTable({
    name: 'orders_products',
    joinColumn: { name: 'orders_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'products_id', referencedColumnName: 'id' },
  })
  products: ProductEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'shipment' })
  account: AccountEntity;

  @Column()
  total: number;

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
}
