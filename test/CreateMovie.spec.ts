import { CreateMovie } from '../src/appliaction/usecase/CreateMovie';
import { MovieRepositoryMemory } from '../src/infra/repository/memory/MovieRepositoryMemory';

test('Deve criar um filme', async function () {
  const movieRepository = new MovieRepositoryMemory();
  const input = {
    name: 'Spiderman 2',
    year: 2004,
    gender: 'Super Hero',
    director: 'Sam Raimi',
    producer: 'Columbia Pictures',
    cast: ['Tobey Maguire', 'Kisten Dunst', 'James Franco', 'Alfred Molina'],
  };
  const createMovie = new CreateMovie(movieRepository);
  const output = await createMovie.execute(input);
  expect(output.id).toBeDefined();
});
