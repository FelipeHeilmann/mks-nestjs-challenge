import { CreateMovie } from '../src/appliaction/usecase/CreateMovie';
import { GetMovie } from '../src/appliaction/usecase/GetMovie';
import { MovieRepositoryMemory } from '../src/infra/repository/memory/MovieRepositoryMemory';

test('Deve buscar um filme por id', async function () {
  const movieRepository = new MovieRepositoryMemory();
  const input = {
    name: 'Spiderman 2',
    year: 2004,
    genre: 'Super Hero',
    director: 'Sam Raimi',
    studio: 'Columbia Pictures',
    cast: ['Tobey Maguire', 'Kisten Dunst', 'James Franco', 'Alfred Molina'],
  };
  const createMovie = new CreateMovie(movieRepository);
  const outputCreateMovie = await createMovie.execute(input);
  const getMovie = new GetMovie(movieRepository);
  const outputGetMovie = await getMovie.execute(outputCreateMovie.id);
  expect(outputGetMovie.name).toBe('Spiderman 2');
  expect(outputGetMovie.director).toBe('Sam Raimi');
  expect(outputGetMovie.year).toBe(2004);
});
