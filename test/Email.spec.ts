import { InvalidEmail } from '../src/appliaction/exceptions/ApplicationExeption';
import { Email } from '../src/domain/vo/Email';

test('Deve criar um email valido', function () {
  const email = new Email('felipehm@gmail.com.com');
  expect(email.getValue()).toBe('felipehm@gmail.com.com');
});

test('Não deve criar um email', function () {
  expect(() => new Email('felipe.felipe.com')).toThrow(new InvalidEmail());
});
