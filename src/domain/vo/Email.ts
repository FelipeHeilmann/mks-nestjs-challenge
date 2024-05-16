import { InvalidEmail } from '../../appliaction/exceptions/ApplicationExeption';

export class Email {
  private value: string;

  constructor(email: string) {
    const regex = /^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/;

    if (!regex.test(email)) throw new InvalidEmail();

    this.value = email;
  }

  getValue(): string {
    return this.value;
  }
}
