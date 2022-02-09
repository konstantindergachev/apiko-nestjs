import { AccountEntity } from '@app/account/account.entity';
import { FavoriteEntity } from '@app/favorite/favorite.entity';
import { Exclude } from 'class-transformer';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;

  @OneToMany(() => FavoriteEntity, (favorite) => favorite.user)
  favorites: FavoriteEntity[];
}
