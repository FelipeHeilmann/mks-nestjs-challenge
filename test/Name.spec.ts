import { InvalidName } from '../src/appliaction/exceptions/ApplicationExeption';
import { Name } from '../src/domain/vo/Name';

test('Deve criar um nome', function () {
  const name = new Name('Felipe Heilmann');
  expect(name.getValue()).toBe('Felipe Heilmann');
});

test('Não deve criar um nome', function () {
  expect(() => new Name('Felipe')).toThrow(new InvalidName());
});
