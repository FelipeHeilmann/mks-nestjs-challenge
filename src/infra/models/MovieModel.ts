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
  gender: string;

  @Column()
  producer: string;

  @Column('text', { array: true })
  cast: string[];

  constructor(
    id: string,
    name: string,
    year: number,
    gender: string,
    director: string,
    producer: string,
    cast: string[],
  ) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.gender = gender;
    this.director = director;
    this.producer = producer;
    this.cast = cast;
  }

  toAggregate() {
    return new Movie(
      this.id,
      this.name,
      this.year,
      this.gender,
      this.director,
      this.producer,
      this.cast,
    );
  }

  static fromAggregate(movie: Movie) {
    return new MovieModel(
      movie.id,
      movie.getName(),
      movie.getYear(),
      movie.getGender(),
      movie.getDirector(),
      movie.getProducer(),
      movie.getCast(),
    );
  }
}
