import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/auth/user.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isAdmin = this.reflector.get<boolean>('admin', context.getHandler());

    if (!isAdmin) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user: User = request.user;
    return user.isAdmin === isAdmin;
  }
}
