import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.create(createUserDto);
    try {
      await this.save(user);
      return user;
    } catch (error) {
      if (parseInt(error.code) === 23505) {
        throw new ConflictException('User with email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
