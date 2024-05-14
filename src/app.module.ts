import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { Signup } from './appliaction/usecase/Signup';
import { UserRepositoryMemory } from './infra/repository/memory/UserRepositoryMemory';

@Module({
  imports: [],
  controllers: [],
  providers: [
    AppService,
    Signup,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryMemory,
    },
  ],
})
export class AppModule {}
