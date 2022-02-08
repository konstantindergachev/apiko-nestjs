import { AccountEntity } from '@app/account/account.entity';

export interface IUserResponse extends AccountEntity {
  token: string;
}
