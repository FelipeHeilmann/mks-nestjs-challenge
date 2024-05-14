import MovieRepository from 'src/domain/repository/MovieRepository';

export class UpdateMovie {
  constructor(readonly movieRepository: MovieRepository) {}

  async execute(input: Input): Promise<void> {
    const movie = await this.movieRepository.getById(input.id);
    movie.updateInfo(
      input.name,
      input.year,
      input.gender,
      input.director,
      input.producer,
      input.cast,
    );
    await this.movieRepository.update(movie);
  }
}

type Input = {
  id: string;
  name: string;
  year: number;
  gender: string;
  director: string;
  producer: string;
  cast: string[];
};
