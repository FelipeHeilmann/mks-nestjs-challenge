import { Movie } from 'src/domain/entity/Movie';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('movies')
export class MovieModel {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @Column()
  director: string;

  @Column()
  genre: string;

  @Column()
  studio: string;

  @Column('text', { array: true })
  cast: string[];

  constructor(
    id: string,
    name: string,
    year: number,
    genre: string,
    director: string,
    studio: string,
    cast: string[],
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.genre = genre;
    this.director = director;
    this.studio = studio;
    this.cast = cast;
  }

  toAggregate() {
    return new Movie(
      this.id,
      this.name,
      this.year,
      this.genre,
      this.director,
      this.studio,
      this.cast,
    );
  }

  static fromAggregate(movie: Movie) {
    return new MovieModel(
      movie.id,
      movie.getName(),
      movie.getYear(),
      movie.getGenre(),
      movie.getDirector(),
      movie.getStudio(),
      movie.getCast(),
    );
  }

  static aggregatefromObject(movie: {
    id: string;
    name: string;
    year: number;
    genre: string;
    director: string;
    studio: string;
    cast: string[];
  }) {
    return new Movie(
      movie.id,
      movie.name,
      movie.year,
      movie.genre,
      movie.director,
      movie.studio,
      movie.cast,
    );
  }
}
