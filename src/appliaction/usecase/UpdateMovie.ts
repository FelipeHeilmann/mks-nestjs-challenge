import { Inject } from '@nestjs/common';
import MovieRepository from 'src/domain/repository/MovieRepository';

export class UpdateMovie {
  constructor(
    @Inject('MovieRepository') readonly movieRepository: MovieRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    const movie = await this.movieRepository.getById(input.id);
    movie.updateInfo(
      input.name,
      input.year,
      input.genre,
      input.director,
      input.studio,
      input.cast,
    );
    await this.movieRepository.update(movie);
  }
}

type Input = {
  id: string;
  name: string;
  year: number;
  genre: string;
  director: string;
  studio: string;
  cast: string[];
};
