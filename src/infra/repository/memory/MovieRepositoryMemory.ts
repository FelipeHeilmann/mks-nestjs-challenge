import { Movie } from 'src/domain/entity/Movie';
import MovieRepository from 'src/domain/repository/MovieRepository';

export class MovieRepositoryMemory implements MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [];
  }

  async list(): Promise<Movie[]> {
    return this.movies;
  }

  async getById(movieId: string): Promise<Movie> {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) throw new Error('Movie not found');
    return movie;
  }

  async save(movie: Movie): Promise<void> {
    this.movies.push(movie);
  }

  async update(movie: Movie): Promise<void> {
    const index = this.movies.findIndex((movie) => movie.id === movie.id);
    if (index === -1) throw new Error('Movie not found');
    movie[index] = movie;
  }
}
