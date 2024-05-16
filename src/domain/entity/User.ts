import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Email } from '../vo/Email';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    private email: Email,
    readonly password: string,
  ) {}

  static create(name: string, email: string, password: string) {
    const id = randomUUID();
    return new User(id, name, new Email(email), password);
  }

  verifyPassword(hashPassword) {
    return bcrypt.compare(this.password, hashPassword);
  }

  getEmail() {
    return this.email.getValue();
  }
}
