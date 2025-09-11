import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { MESSAGE_KEY } from '../decorators/message.decorator';

@Injectable()
export class MessageInterceptor<T = any>
  implements NestInterceptor<T, { message: string; data: T }>
{
  constructor(private reflector: Reflector) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<{ message: string; data: T }>> {
    const message: string =
      this.reflector.get(MESSAGE_KEY, context.getHandler()) ||
      'Операция выполнена успешно!';

    return next.handle().pipe(
      map((data: T): any => {
        if (data && typeof data === 'object' && 'message' in data) {
          return data as any;
        }

        return {
          message: message,
          data,
        };
      }),
    );
  }
}
