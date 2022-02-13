import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  getUser(): string {
    return 'Getting all users';
  }

  @Post('/signup')
  signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signin')
  signIn(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<string> {
    return this.authService.signIn(email, password);
  }
}
