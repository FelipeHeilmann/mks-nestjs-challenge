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
    const cachedData = await this.cache.getValue('movies');
    if (cachedData) {
      const movies: Movie[] = [];
      for (const movieData of cachedData) {
        movies.push(MovieModel.aggregatefromObject(movieData));
      }
      return movies;
    }
    const movies = await this.decoreted.list();
    await this.cache.setValue('movies', movies, 120);
    return movies;
  }

  async getById(movieId: string): Promise<Movie> {
    const cachedData = await this.cache.getValue(movieId);
    if (cachedData) return MovieModel.aggregatefromObject(cachedData);
    const movie = await this.decoreted.getById(movieId);
    await this.cache.setValue(movieId, movie, 120);
    return movie;
  }

  async save(movie: Movie): Promise<void> {
    await this.decoreted.save(movie);
  }

  async update(movie: Movie): Promise<void> {
    await this.decoreted.update(movie);
  }

  async delete(movieId: string): Promise<void> {
    await this.cache.deleteValue(movieId);
    await this.decoreted.delete(movieId);
  }
}
