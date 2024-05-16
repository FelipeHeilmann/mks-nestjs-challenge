export abstract class BaseException extends Error {
  readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
  }
}

export class InvalidCredentials extends BaseException {
  constructor() {
    super('Email and/or password invalid', 400);
  }
}

export class EmailInUse extends BaseException {
  constructor() {
    super('Email already in use', 422);
  }
}

export class InvalidEmail extends BaseException {
  constructor() {
    super('Email format invalid', 400);
  }
}

export class InvalidName extends BaseException {
  constructor() {
    super('Name format invalid', 400);
  }
}
