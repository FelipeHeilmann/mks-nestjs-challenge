export abstract class BaseException extends Error {
  private readonly statusCode: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }

  getStatus() {
    return this.statusCode;
  }
}

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super(message, 404);
  }
}
