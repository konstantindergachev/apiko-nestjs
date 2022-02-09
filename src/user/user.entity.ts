import { AccountEntity } from '@app/account/account.entity';
import { Exclude } from 'class-transformer';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column()
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;
}
