import { v4 as uuidv4 } from 'uuid';

export class Movie {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly year: number,
    readonly gender: string,
    readonly director: string,
    readonly producer: string,
    readonly cast: string[],
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
}
