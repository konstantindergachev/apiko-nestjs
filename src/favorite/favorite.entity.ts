import { ProductEntity } from '@app/product/product.entity';

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

  @Column()
  prod_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => ProductEntity, (product) => product.favorites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;
}
