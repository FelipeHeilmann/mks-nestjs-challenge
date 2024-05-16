import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';
import { Email } from '../vo/Email';
import { Name } from '../vo/Name';

export class User {
  constructor(
    readonly id: string,
    private name: Name,
    private email: Email,
    readonly password: string,
  ) {}

  static create(name: string, email: string, password: string) {
    const id = randomUUID();
    return new User(id, new Name(name), new Email(email), password);
  }

  verifyPassword(hashPassword) {
    return bcrypt.compare(this.password, hashPassword);
  }

  getEmail() {
    return this.email.getValue();
  }

  getName() {
    return this.name.getValue();
  }
}
