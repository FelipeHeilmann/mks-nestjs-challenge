import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BaseException } from 'src/appliaction/exceptions/ApplicationExeption';

@Catch()
export class GlobalErrorMiddleware implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = this.getStatus(exception);

    const message = exception.message || 'Internal server error';

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }

  private getStatus(exception: any): number {
    if (exception instanceof BaseException) {
      return exception.statusCode || 500;
    }
    if (exception instanceof HttpException) {
      return exception.getStatus();
    }
    return 500;
  }
}
