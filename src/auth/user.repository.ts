import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private readonly logger = new Logger();

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = this.create({ ...createUserDto, password: hash });
    try {
      await this.save(user);
      user.password = undefined;
      return user;
    } catch (error) {
      this.logger.error(
        `Failed to save user in DB: "${user.firstName} ${user.lastName}"`,
        error.stack,
      );
      if (parseInt(error.code) === 23505) {
        throw new ConflictException('User with email already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
