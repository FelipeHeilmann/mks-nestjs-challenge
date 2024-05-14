import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMovie } from 'src/appliaction/usecase/CreateMovie';
import { CreateMovieRequest } from '../request/CreateMovieRequest';
import { ListMovies } from 'src/appliaction/usecase/ListMovies';
import { GetMovie } from 'src/appliaction/usecase/GetMovie';
import { UpdateMovie } from 'src/appliaction/usecase/UpdateMovie';
import { DeleteMovie } from 'src/appliaction/usecase/DeleteMovie';

@Controller('movies')
export class MovieController {
  constructor(
    private readonly listMovies: ListMovies,
    private readonly getMovie: GetMovie,
    private readonly createMovie: CreateMovie,
    private readonly updateMovie: UpdateMovie,
    private readonly deleteMovie: DeleteMovie,
  ) {}

  @HttpCode(201)
  @Get()
  async getAll() {
    return await this.listMovies.execute();
  }

  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.getMovie.execute(id);
  }

  @HttpCode(201)
  @Post()
  async create(@Body() request: CreateMovieRequest) {
    const input = {
      name: request.name,
      director: request.director,
      studio: request.studio,
      year: request.year,
      genre: request.genre,
      cast: request.cast,
    };
    return await this.createMovie.execute(input);
  }

  @HttpCode(204)
  @Put(':id')
  async update(@Param('id') id: string, @Body() request: CreateMovieRequest) {
    const input = {
      id,
      name: request.name,
      director: request.director,
      studio: request.studio,
      year: request.year,
      genre: request.genre,
      cast: request.cast,
    };
    await this.updateMovie.execute(input);
  }

  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteMovie.execute(id);
  }
}
