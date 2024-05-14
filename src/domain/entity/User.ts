import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly password: string,
  ) {}

  static create(name: string, email: string, password: string) {
    const id = uuidv4();
    return new User(id, name, email, password);
  }
}
