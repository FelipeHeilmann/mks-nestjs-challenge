import { UserRepositoryMemory } from '../src/infra/repository/memory/UserRepositoryMemory';
import { Signup } from '../src/appliaction/usecase/Signup';

test('Deve criar uma conta', async function () {
  const userRepository = new UserRepositoryMemory();
  const input = {
    name: 'John Doe',
    email: 'john.doe@gmai.com',
    password: 'acb1234',
  };
  const signup = new Signup(userRepository);
  const output = await signup.execute(input);
  expect(output.id).toBeDefined();
});

test('Não deve criar uma conta para um email em uso', async function () {
  const userRepository = new UserRepositoryMemory();
  const input = {
    name: 'John Doe',
    email: 'john.doe@gmai.com',
    password: 'acb1234',
  };
  const signup = new Signup(userRepository);
  await signup.execute(input);
  await expect(() => signup.execute(input)).rejects.toThrow(
    new Error('Email already in use'),
  );
});
