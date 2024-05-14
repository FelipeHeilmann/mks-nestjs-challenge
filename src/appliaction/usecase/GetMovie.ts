import MovieRepository from '../../domain/repository/MovieRepository';

export class GetMovie {
  constructor(readonly movieRepository: MovieRepository) {}

  async execute(movieId: string): Promise<Output> {
    const movie = await this.movieRepository.getById(movieId);
    return {
      id: movie.id,
      name: movie.name,
      year: movie.year,
      director: movie.director,
      gender: movie.gender,
      cast: movie.cast,
      producer: movie.producer,
    };
  }
}

type Output = {
  id: string;
  name: string;
  director: string;
  year: number;
  gender: string;
  producer: string;
  cast: string[];
};
