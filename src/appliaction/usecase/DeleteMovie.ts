import MovieRepository from 'src/domain/repository/MovieRepository';

export class DeleteMovie {
  constructor(readonly movieRepository: MovieRepository) {}

  async execute(movieId: string): Promise<void> {
    await this.movieRepository.delete(movieId);
  }
}
