import { Signin } from '../src/appliaction/usecase/Signin';
import { Signup } from '../src/appliaction/usecase/Signup';
import { UserRepositoryMemory } from '../src/infra/repository/memory/UserRepositoryMemory';
import { TokenGeneratorMemory } from '../src/infra/token/TokenGeneratorMemory';

test('Deve fazer autenticar um usuario', async function () {
  const userRepository = new UserRepositoryMemory();
  const tokenGenerator = new TokenGeneratorMemory();
  const inputSignup = {
    name: 'John Doe',
    email: 'john.doe@gmai.com',
    password: 'acb1234',
  };
  const signup = new Signup(userRepository);
  await signup.execute(inputSignup);
  const inputSignin = {
    email: 'john.doe@gmai.com',
    password: 'acb1234',
  };
  const signin = new Signin(userRepository, tokenGenerator);
  const output = await signin.execute(inputSignin);
  expect(output.token).toBeDefined();
});

test('Não deve autenticar um usuario com email invalido', async function () {
  const userRepository = new UserRepositoryMemory();
  const tokenGenerator = new TokenGeneratorMemory();
  const inputSignin = {
    email: 'john.doe@gmai.com',
    password: 'acb1234',
  };
  const signin = new Signin(userRepository, tokenGenerator);
  await expect(() => signin.execute(inputSignin)).rejects.toThrow(
    new Error('Email and/or password invalid'),
  );
});
