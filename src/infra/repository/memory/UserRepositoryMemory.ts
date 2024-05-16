import { User } from 'src/domain/entity/User';
import UserRepository from 'src/domain/repository/UserRepository';

export class UserRepositoryMemory implements UserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }
  async getByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.getEmail() === email);
    return user;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
