import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

/**
 * Interceptor that serializes the response data to the specified DTO class.
 */
export class SerializeInterceptor implements NestInterceptor {
  /**
   * Creates an instance of SerializeInterceptor.
   * @param dto - The DTO class to serialize the response data to.
   */
  constructor(private dto: any) {}

  /**
   * Intercepts the execution context and handles the call handler.
   * @param context - The execution context.
   * @param handler - The call handler.
   * @returns An observable that emits the serialized response data.
   */
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data: any) => {
        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
