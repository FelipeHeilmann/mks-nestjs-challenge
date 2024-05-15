import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static create(name: string, email: string, password: string) {
    const id = randomUUID();
    return new User(id, name, email, password);
  }

  verifyPassword(hashPassword) {
    return bcrypt.compare(this.password, hashPassword);
  }
}
