import { Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  getUser(): string {
    return 'Getting all users';
  }

  @Post('/signup')
  signUp(): string {
    return 'Signing up the user';
  }

  @Get('/signin')
  signIn(): string {
    return 'Signing in the user...';
  }
}
