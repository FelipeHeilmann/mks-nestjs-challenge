import { Module } from '@nestjs/common';
import { Signup } from './appliaction/usecase/Signup';
import { UserController } from './api/controller/User.Controller';
import { Signin } from './appliaction/usecase/Signin';
import { TokenGeneratorNestJS } from './infra/token/TokenGeneratorNestjs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infra/models/UserModel';
import { MovieModel } from './infra/models/MovieModel';
import { UserRepositoryTypeORM } from './infra/repository/typeorm/UserRepositoryTypeORM';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      entities: [UserModel, MovieModel],
      password: 'docker',
      username: 'docker',
      database: 'mks',
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([UserModel, MovieModel]),
    JwtModule.register({
      secret: process.env.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [UserController],
  providers: [
    Signup,
    Signin,
    UserRepositoryTypeORM,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryTypeORM,
    },
    {
      provide: 'TokenGenerator',
      useClass: TokenGeneratorNestJS,
    },
  ],
})
export class AppModule {}
