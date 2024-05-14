import { Movie } from '../../domain/entity/Movie';
import MovieRepository from 'src/domain/repository/MovieRepository';

export class CreateMovie {
  constructor(readonly movieRepository: MovieRepository) {}

  async execute(input: Input): Promise<Output> {
    const movie = Movie.create(
      input.name,
      input.year,
      input.genre,
      input.director,
      input.studio,
      input.cast,
    );
    await this.movieRepository.save(movie);
    return {
      id: movie.id,
    };
  }
}

type Input = {
  name: string;
  year: number;
  genre: string;
  director: string;
  studio: string;
  cast: string[];
};

type Output = {
  id: string;
};
