import { DeleteMovie } from '../src/appliaction/usecase/DeleteMovie';
import { CreateMovie } from '../src/appliaction/usecase/CreateMovie';
import { GetMovie } from '../src/appliaction/usecase/GetMovie';
import { MovieRepositoryMemory } from '../src/infra/repository/memory/MovieRepositoryMemory';

test('Deve apagar um filme', async function () {
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
  const deleteMovie = new DeleteMovie(movieRepository);
  await deleteMovie.execute(outputCreateMovie.id);
  const getMovie = new GetMovie(movieRepository);
  await expect(() => getMovie.execute(outputCreateMovie.id)).rejects.toThrow(
    new Error('Movie not found'),
  );
});
