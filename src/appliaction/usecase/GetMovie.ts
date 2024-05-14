import { Inject } from '@nestjs/common';
import MovieRepository from '../../domain/repository/MovieRepository';

export class GetMovie {
  constructor(
    @Inject('MovieRepository') readonly movieRepository: MovieRepository,
  ) {}

  async execute(movieId: string): Promise<Output> {
    const movie = await this.movieRepository.getById(movieId);
    return {
      id: movie.id,
      name: movie.getName(),
      year: movie.getYear(),
      director: movie.getDirector(),
      gender: movie.getGenre(),
      cast: movie.getCast(),
      studio: movie.getStudio(),
    };
  }
}

type Output = {
  id: string;
  name: string;
  director: string;
  year: number;
  gender: string;
  studio: string;
  cast: string[];
};
