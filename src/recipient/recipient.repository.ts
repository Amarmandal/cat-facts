import {
  ConflictException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { Recipient } from './recipient.entity';
import * as bcrypt from 'bcrypt';

@EntityRepository(Recipient)
export class RecipientRepository extends Repository<Recipient> {
  private readonly logger = new Logger();
  async createRecipient(
    createRecipientDto: CreateRecipientDto,
    user: User,
  ): Promise<Recipient> {
    const { name, phoneNumber, password } = createRecipientDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const recipient = this.create({ name, phoneNumber, password: hash });
    recipient.addedBy = user;
    try {
      await this.save(recipient);
      recipient.addedBy = undefined;
      return recipient;
    } catch (error) {
      this.logger.error(
        `Failed to add recipient. ${JSON.stringify(createRecipientDto)}`,
        error.stack,
      );
      if (parseInt(error.code) === 23505) {
        throw new ConflictException(
          'User with associated phone number already exist!',
        );
      } else {
        throw new UnauthorizedException();
      }
    }
  }
}
