import { CategoryEntity } from '@app/category/category.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  price: number;

  @Column()
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
}
