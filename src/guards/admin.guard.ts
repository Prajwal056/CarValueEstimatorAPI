import { CanActivate, ExecutionContext } from '@nestjs/common';

/**
 * A guard that checks if the current user is an admin.
 */
export class AdminGuard implements CanActivate {
  /**
   * Determines if the current user is an admin.
   * @param context - The execution context.
   * @returns A boolean indicating if the current user is an admin.
   */
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.currentUser) {
      return false;
    }

    return request.currentUser.admin;
  }
}
