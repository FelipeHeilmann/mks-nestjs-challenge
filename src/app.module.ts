import { Module } from '@nestjs/common';
import { Signup } from './appliaction/usecase/Signup';
import { UserController } from './api/controller/UserController';
import { Signin } from './appliaction/usecase/Signin';
import { TokenGeneratorNestJS } from './infra/token/TokenGeneratorNestjs';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infra/models/UserModel';
import { MovieModel } from './infra/models/MovieModel';
import { UserRepositoryTypeORM } from './infra/repository/typeorm/UserRepositoryTypeORM';
import { MovieController } from './api/controller/MovieController';
import { CreateMovie } from './appliaction/usecase/CreateMovie';
import { ListMovies } from './appliaction/usecase/ListMovies';
import { MovieRepositoryTypeORM } from './infra/repository/typeorm/MovieRepositoryTypeORM';
import { GetMovie } from './appliaction/usecase/GetMovie';
import { UpdateMovie } from './appliaction/usecase/UpdateMovie';
import { DeleteMovie } from './appliaction/usecase/DeleteMovie';

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
  controllers: [UserController, MovieController],
  providers: [
    Signup,
    Signin,
    CreateMovie,
    ListMovies,
    GetMovie,
    UpdateMovie,
    DeleteMovie,
    UserRepositoryTypeORM,
    MovieRepositoryTypeORM,
    {
      provide: 'UserRepository',
      useClass: UserRepositoryTypeORM,
    },
    {
      provide: 'MovieRepository',
      useClass: MovieRepositoryTypeORM,
    },
    {
      provide: 'TokenGenerator',
      useClass: TokenGeneratorNestJS,
    },
  ],
})
export class AppModule {}
