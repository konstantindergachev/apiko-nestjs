import { CategoryEntity } from '@app/category/category.entity';
import { FavoriteEntity } from '@app/favorite/favorite.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
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

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => CategoryEntity, (category) => category.products, {
    eager: false,
  })
  @Exclude({ toPlainOnly: true })
  category: CategoryEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.product, {
    eager: true,
  })
  favorites: FavoriteEntity[];
}
