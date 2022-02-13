import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  signUp(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ email });
    const isPassMatch = await bcrypt.compare(password, user.password);

    if (user && isPassMatch) {
      return 'Sigin Success';
    } else {
      throw new UnauthorizedException('Invalid Login Credentails');
    }
  }
}
