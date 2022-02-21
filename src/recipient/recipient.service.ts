import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { Recipient } from './recipient.entity';
import { RecipientRepository } from './recipient.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RecipientService {
  constructor(
    @InjectRepository(RecipientRepository)
    private readonly recipientRepository: RecipientRepository,
    private jwtService: JwtService,
  ) {}

  async getRecipientById(recipientId: string, user: User): Promise<Recipient> {
    const recipient = await this.recipientRepository.findOne({
      id: recipientId,
      addedBy: user,
    });
    if (!recipient) {
      throw new UnauthorizedException();
    }

    return recipient;
  }

  async signIn(
    phoneNumber: number,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.recipientRepository.findOne({ phoneNumber });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = { id: user.id };
      return { accessToken: this.jwtService.sign(payload) };
    } else {
      throw new UnauthorizedException('Invalid Login Credentails');
    }
  }

  createRecipient(
    createRecipientDto: CreateRecipientDto,
    user: User,
  ): Promise<Recipient> {
    return this.recipientRepository.createRecipient(createRecipientDto, user);
  }

  async updateSubscription(
    recipient: Recipient,
    animalType: string,
  ): Promise<string> {
    const user = await this.getRecipientById(recipient.id, recipient.addedBy);
    user.subscriptions.push(animalType);
    await this.recipientRepository.save(user);
    return `Category "${animalType}" added to subscription list of "${user.name}"`;
  }
}
