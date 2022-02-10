import { ProductEntity } from '@app/product/product.entity';
import { UserEntity } from '@app/user/user.entity';

import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'favorites' })
export class FavoriteEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  @ManyToOne(() => ProductEntity, (product) => product.favorites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.favorites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
