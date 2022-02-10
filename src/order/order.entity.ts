import { AccountEntity } from '@app/account/account.entity';
import { ProductEntity } from '@app/product/product.entity';
import { UserEntity } from '@app/user/user.entity';
import { Exclude } from 'class-transformer';
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

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'owner_id' })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders, {
    cascade: true,
  })
  @JoinTable({ name: 'items' })
  products: ProductEntity[];

  @ManyToOne(() => AccountEntity, (account) => account.orders)
  @JoinColumn({ name: 'shipment' })
  account: AccountEntity;

  @Column()
  total: number;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
