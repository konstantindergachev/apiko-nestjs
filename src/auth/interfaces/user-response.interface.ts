import { AccountEntity } from '@app/account/account.entity';

export interface IUserResponse {
  account: AccountEntity;
  token: string;
}
