import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/User';
import UserRepository from 'src/domain/repository/UserRepository';
import { UserModel } from 'src/infra/models/UserModel';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepositoryTypeORM implements UserRepository {
  constructor(
    @InjectRepository(UserModel)
    private readonly typeOrmRepo: Repository<UserModel>,
  ) {}

  async save(user: User): Promise<void> {
    const userModel = UserModel.fromAggregate(user);
    await this.typeOrmRepo.save(userModel);
  }

  async getByEmail(email: string): Promise<User | undefined> {
    const userModel = await this.typeOrmRepo.findOne({
      where: {
        email: email,
      },
    });
    return !userModel ? undefined : userModel.toAggregate();
  }
}
