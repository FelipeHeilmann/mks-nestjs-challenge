import { Movie } from '../entity/Movie';

export default interface MovieRepository {
  getById(movieId: string): Promise<Movie>;
  save(movie: Movie): Promise<void>;
}
