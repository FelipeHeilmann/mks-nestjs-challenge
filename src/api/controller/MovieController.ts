import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateMovie } from 'src/appliaction/usecase/CreateMovie';
import { MovieRequest } from '../request/CreateMovieRequest';
import { ListMovies } from 'src/appliaction/usecase/ListMovies';
import { GetMovie } from 'src/appliaction/usecase/GetMovie';
import { UpdateMovie } from 'src/appliaction/usecase/UpdateMovie';
import { DeleteMovie } from 'src/appliaction/usecase/DeleteMovie';
import { AuthMiddleware } from '../middleware/AuthMiddlewre';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(AuthMiddleware)
@ApiBearerAuth()
@ApiTags('movies')
@ApiResponse({ status: 401, description: 'Unauthorized.' })
@Controller('movies')
export class MovieController {
  constructor(
    private readonly listMovies: ListMovies,
    private readonly getMovie: GetMovie,
    private readonly createMovie: CreateMovie,
    private readonly updateMovie: UpdateMovie,
    private readonly deleteMovie: DeleteMovie,
  ) {}

  @ApiResponse({
    status: 200,
    description: 'The movies has been successfully fetched.',
  })
  @HttpCode(200)
  @Get()
  async getAll() {
    return await this.listMovies.execute();
  }

  @ApiResponse({
    status: 200,
    description: 'The movie has been successfully fetched.',
  })
  @ApiResponse({
    status: 404,
    description: 'The movie was not found.',
  })
  @HttpCode(200)
  @Get(':id')
  async getById(@Param('id') id: string) {
    return await this.getMovie.execute(id);
  }

  @ApiResponse({
    status: 201,
    description: 'The movie has been successfully created.',
  })
  @HttpCode(201)
  @Post()
  async create(@Body() request: MovieRequest) {
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

  @ApiResponse({
    status: 204,
    description: 'The operation has been successfully executed.',
  })
  @ApiResponse({
    status: 404,
    description: 'The movie was not found.',
  })
  @HttpCode(204)
  @Put(':id')
  async update(@Param('id') id: string, @Body() request: MovieRequest) {
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

  @ApiResponse({
    status: 204,
    description: 'The operation has been successfully executed.',
  })
  @ApiResponse({
    status: 404,
    description: 'The movie was not found.',
  })
  @HttpCode(204)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.deleteMovie.execute(id);
  }
}
