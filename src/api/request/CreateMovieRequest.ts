import { PartialType } from '@nestjs/mapped-types';

class _createMovieRequest {
  name: string;
  director: string;
  genre: string;
  year: number;
  studio: string;
  cast: string[];
}

export class CreateMovieRequest extends PartialType(_createMovieRequest) {}
