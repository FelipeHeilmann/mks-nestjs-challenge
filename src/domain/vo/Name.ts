import { InvalidName } from '../../appliaction/exceptions/ApplicationExeption';

export class Name {
  private value: string;

  constructor(name: string) {
    if (name.split(' ').length < 2) throw new InvalidName();
    this.value = name;
  }

  getValue() {
    return this.value;
  }
}
