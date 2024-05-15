import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from 'src/appliaction/exceptions/ApplicationExeption';
import { Movie } from 'src/domain/entity/Movie';
import MovieRepository from 'src/domain/repository/MovieRepository';
import { MovieModel } from 'src/infra/models/MovieModel';
import { Repository } from 'typeorm';

export class MovieRepositoryTypeORM implements MovieRepository {
  constructor(
    @InjectRepository(MovieModel)
    private readonly typeOrmRepo: Repository<MovieModel>,
  ) {}

  async list(): Promise<Movie[]> {
    const moviesModel = await this.typeOrmRepo.find();
    const movies: Movie[] = [];
    for (const movieModel of moviesModel) {
      movies.push(movieModel.toAggregate());
    }
    return movies;
  }

  async getById(movieId: string): Promise<Movie> {
    const movieModel = await this.typeOrmRepo.findOne({
      where: {
        id: movieId,
      },
    });
    if (!movieModel) throw new NotFoundException('Movie was not found');
    return movieModel.toAggregate();
  }

  async save(movie: Movie): Promise<void> {
    await this.typeOrmRepo.save(MovieModel.fromAggregate(movie));
  }

  async update(movie: Movie): Promise<void> {
    await this.typeOrmRepo.update(movie.id, MovieModel.fromAggregate(movie));
  }

  async delete(movieId: string): Promise<void> {
    await this.typeOrmRepo.delete(movieId);
  }
}
