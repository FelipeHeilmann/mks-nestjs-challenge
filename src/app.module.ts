import { Module } from '@nestjs/common';
import { Signup } from './appliaction/usecase/Signup';
import { UserRepositoryMemory } from './infra/repository/memory/UserRepositoryMemory';

@Module({
  imports: [],
  controllers: [],
  providers: [
    Signup,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryMemory,
    },
  ],
})
export class AppModule {}
