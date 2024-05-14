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
    producer: string,
    cast: string[],
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.genre = genre;
    this.director = director;
    this.studio = producer;
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
}
