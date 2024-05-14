import MovieRepository from 'src/domain/repository/MovieRepository';

export class ListMovies {
  constructor(readonly moviesRepository: MovieRepository) {}

  async execute(): Promise<Output> {
    const movies = await this.moviesRepository.list();
    const output: Output = [];
    for (const movie of movies) {
      output.push({
        id: movie.id,
        name: movie.getName(),
        year: movie.getYear(),
        director: movie.getDirector(),
        gender: movie.getGender(),
        cast: movie.getCast(),
        producer: movie.getProducer(),
      });
    }
    return output;
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
}[];
