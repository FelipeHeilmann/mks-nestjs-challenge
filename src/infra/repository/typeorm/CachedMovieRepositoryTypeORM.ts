import MemoryCache from 'src/appliaction/cache/Cache';
import { Movie } from 'src/domain/entity/Movie';
import MovieRepository from 'src/domain/repository/MovieRepository';
import { MovieRepositoryTypeORM } from './MovieRepositoryTypeORM';
import { Inject } from '@nestjs/common';
import { MovieModel } from 'src/infra/models/MovieModel';

export class CachedMovieRepository implements MovieRepository {
  constructor(
    private readonly decoreted: MovieRepositoryTypeORM,
    @Inject('MemoryCache')
    private readonly cache: MemoryCache,
  ) {}

  async list(): Promise<Movie[]> {
    return await this.decoreted.list();
  }

  async getById(movieId: string): Promise<Movie> {
    const cachedData = await this.cache.getValue(movieId);
    if (cachedData) return MovieModel.aggregatefromObject(cachedData);
    const movie = await this.decoreted.getById(movieId);
    await this.cache.setValue(movieId, movie, 60);
    return movie;
  }

  async save(movie: Movie): Promise<void> {
    await this.decoreted.save(movie);
  }

  async update(movie: Movie): Promise<void> {
    await this.cache.setValue(movie.id, movie, 60);
    await this.decoreted.update(movie);
  }

  async delete(movieId: string): Promise<void> {
    await this.cache.deleteValue(movieId);
    await this.decoreted.delete(movieId);
  }
}
