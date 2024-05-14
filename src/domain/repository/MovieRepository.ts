import { Movie } from '../entity/Movie';

export default interface MovieRepository {
  list(): Promise<Movie[]>;
  getById(movieId: string): Promise<Movie>;
  save(movie: Movie): Promise<void>;
  update(movie: Movie): Promise<void>;
}
