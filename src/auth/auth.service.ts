import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async create(data): Promise<string> {
    const hashed = await this.hashedPassword(data.password);

    return hashed;
  }

  async hashedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
}
