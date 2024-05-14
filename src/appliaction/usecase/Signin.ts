import UserRepository from 'src/domain/repository/UserRepository';
import TokenGenerator from '../token/TokenGenerator';
import { Inject } from '@nestjs/common';

export class Signin {
  constructor(
    @Inject('UserRepository')
    readonly userRepository: UserRepository,
    @Inject('TokenGenerator')
    readonly tokenGenetator: TokenGenerator,
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);
    if (!user) throw new Error('Email and/or password invalid');
    const passwordVerified = user.verifyPassword(input.password);
    if (!passwordVerified) throw new Error('Email and/or password invalid');
    const token = await this.tokenGenetator.generate(
      user.id,
      user.email,
      user.name,
    );
    return {
      token,
    };
  }
}

type Input = {
  email: string;
  password: string;
};

type Output = {
  token: string;
};
