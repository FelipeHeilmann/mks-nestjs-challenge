import { Inject } from '@nestjs/common';
import { User } from '../../domain/entity/User';
import UserRepository from '../../domain/repository/UserRepository';
import * as bcrypt from 'bcrypt';

export class Signup {
  constructor(
    @Inject('UserRepository') readonly userRepository: UserRepository,
  ) {}

  async execute(input: Input): Promise<Output> {
    const existingUser = await this.userRepository.getByEmail(input.email);
    if (existingUser) throw new Error('Email already in use');
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(input.password, salt);
    const user = User.create(input.name, input.email, hashPassword);
    await this.userRepository.save(user);
    return {
      id: user.id,
    };
  }
}

type Input = {
  name: string;
  email: string;
  password: string;
};

type Output = {
  id: string;
};
