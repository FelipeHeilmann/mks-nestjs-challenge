import { v4 as uuidv4 } from 'uuid';

export class Movie {
  constructor(
    readonly id: string,
    private name: string,
    private year: number,
    private genre: string,
    private director: string,
    private studio: string,
    private cast: string[],
  ) {}

  static create(
    name: string,
    year: number,
    genre: string,
    director: string,
    producer: string,
    cast: string[],
  ) {
    const id = uuidv4();
    return new Movie(id, name, year, genre, director, producer, cast);
  }

  getName() {
    return this.name;
  }

  getYear() {
    return this.year;
  }

  getDirector() {
    return this.director;
  }

  getGenre() {
    return this.genre;
  }

  getStudio() {
    return this.studio;
  }

  getCast() {
    return this.cast;
  }

  updateInfo(
    name: string,
    year: number,
    gender: string,
    director: string,
    producer: string,
    cast: string[],
  ) {
    this.name = name;
    this.year = year;
    this.genre = gender;
    this.director = director;
    this.studio = producer;
    this.cast = cast;
  }
}
