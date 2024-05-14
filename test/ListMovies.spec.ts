import { ListMovies } from '../src/appliaction/usecase/ListMovies';
import { CreateMovie } from '../src/appliaction/usecase/CreateMovie';
import { MovieRepositoryMemory } from '../src/infra/repository/memory/MovieRepositoryMemory';

test('Deve listar os filmes', async function () {
  const movieRepository = new MovieRepositoryMemory();
  const input1 = {
    name: 'Spiderman',
    year: 2002,
    gender: 'Super Hero',
    director: 'Sam Raimi',
    producer: 'Columbia Pictures',
    cast: ['Tobey Maguire', 'Kisten Dunst', 'James Franco', 'William Defoe'],
  };
  const input2 = {
    name: 'Spiderman 2',
    year: 2004,
    gender: 'Super Hero',
    director: 'Sam Raimi',
    producer: 'Columbia Pictures',
    cast: ['Tobey Maguire', 'Kisten Dunst', 'James Franco', 'Alfred Molina'],
  };
  const input3 = {
    name: 'Spiderman 3',
    year: 2007,
    gender: 'Super Hero',
    director: 'Sam Raimi',
    producer: 'Columbia Pictures',
    cast: [
      'Tobey Maguire',
      'Kisten Dunst',
      'James Franco',
      'Topher Grace',
      'Thomas Haden Church',
    ],
  };
  const createMovie = new CreateMovie(movieRepository);
  await createMovie.execute(input1);
  await createMovie.execute(input2);
  await createMovie.execute(input3);
  const listMovies = new ListMovies(movieRepository);
  const output = await listMovies.execute();
  expect(output[0].name).toBe('Spiderman');
  expect(output[0].director).toBe('Sam Raimi');
  expect(output[0].year).toBe(2002);

  expect(output[1].name).toBe('Spiderman 2');
  expect(output[1].director).toBe('Sam Raimi');
  expect(output[1].year).toBe(2004);

  expect(output[2].name).toBe('Spiderman 3');
  expect(output[2].director).toBe('Sam Raimi');
  expect(output[2].year).toBe(2007);
});
