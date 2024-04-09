import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * A guard that implements the CanActivate interface to determine if a user is authorized to access a route.
 */
export class AuthGuard implements CanActivate {
  /**
   * Determines if the user is authorized to access the route.
   * @param context - The execution context of the route.
   * @returns A boolean indicating if the user is authorized.
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    return request.session.userId;
  }
}
