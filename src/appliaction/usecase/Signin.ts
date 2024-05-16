import UserRepository from 'src/domain/repository/UserRepository';
import TokenGenerator from '../token/TokenGenerator';
import { Inject } from '@nestjs/common';
import { InvalidCredentials } from '../exceptions/ApplicationExeption';

export class Signin {
  constructor(
    @Inject('UserRepository')
    readonly userRepository: UserRepository,
    @Inject('TokenGenerator')
    readonly tokenGenetator: TokenGenerator,
  ) {}

  async execute(input: Input): Promise<Output> {
    const user = await this.userRepository.getByEmail(input.email);
    if (!user) throw new InvalidCredentials();
    const passwordVerified = user.verifyPassword(input.password);
    if (!passwordVerified) throw new InvalidCredentials();
    const token = await this.tokenGenetator.generate(
      user.id,
      user.getEmail(),
      user.getName(),
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
