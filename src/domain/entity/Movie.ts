import { v4 as uuidv4 } from 'uuid';

export class Movie {
  constructor(
    readonly id: string,
    private name: string,
    private year: number,
    private gender: string,
    private director: string,
    private producer: string,
    private cast: string[],
  ) {}

  static create(
    name: string,
    year: number,
    gender: string,
    director: string,
    producer: string,
    cast: string[],
  ) {
    const id = uuidv4();
    return new Movie(id, name, year, gender, director, producer, cast);
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

  getGender() {
    return this.gender;
  }

  getProducer() {
    return this.producer;
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
    this.gender = gender;
    this.director = director;
    this.producer = producer;
    this.cast = cast;
  }
}
