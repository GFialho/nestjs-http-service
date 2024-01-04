import {
  ArgumentsHost,
  CallHandler,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map } from 'rxjs';

/**
 * Intercepts all responses and formats it to a standardised format.
 */
@Injectable()
export class ResponseFormatter implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map((data) => ({ resultCode: 1, response: data })));
  }
}

/**
 * Intercepts all exceptions and formats it to a standardised format.
 */
@Catch()
export class ExceptionFormatter implements ExceptionFilter {
  logger = new Logger(ExceptionFormatter.name);

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.warn(exception);

    const errorMessage = exception?.response?.message ?? exception?.message;

    if (errorMessage == null) {
      console.log('Unknown error: ', request.url, exception);
    }

    response.status(status).json({
      resultCode: 0,
      error: errorMessage ?? 'Unknown Error',
      errorCode: exception?.cause?.code,
    });
  }
}
