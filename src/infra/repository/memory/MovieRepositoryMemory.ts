import { Movie } from 'src/domain/entity/Movie';
import MovieRepository from 'src/domain/repository/MovieRepository';

export class MovieRepositoryMemory implements MovieRepository {
  private movies: Movie[];

  constructor() {
    this.movies = [];
  }

  async getById(movieId: string): Promise<Movie> {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) throw new Error('Movie not found');
    return movie;
  }

  async save(movie: Movie): Promise<void> {
    this.movies.push(movie);
  }
}
