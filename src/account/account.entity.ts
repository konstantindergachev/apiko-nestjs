import { UserEntity } from '@app/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderEntity } from '@app/order/order.entity';

@Entity({ name: 'accounts' })
export class AccountEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  address: string;

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

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToMany(() => OrderEntity, (order) => order.account)
  orders: OrderEntity[];
}
