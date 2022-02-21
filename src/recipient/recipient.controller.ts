import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { Admin } from 'src/common/decorators/metadata/admin.decorator';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CreateRecipientDto } from './dto/create-recipient.dto';
// import { GetRecipient } from './get-recipient.decorator';
import { Recipient } from './recipient.entity';
import { RecipientService } from './recipient.service';

@Controller('recipient')
export class RecipientController {
  constructor(private recipientService: RecipientService) {}

  @Post()
  @Admin(true)
  @UseGuards(AuthGuard(), AdminGuard)
  createRecepient(
    @GetUser() user: User,
    @Body() createRecipientDto: CreateRecipientDto,
  ): Promise<Recipient> {
    return this.recipientService.createRecipient(createRecipientDto, user);
  }

  // @Patch(':type/subscriptions')
  // @UseGuards(AuthGuard())
  // updateSubscription(
  //   @GetRecipient() recipient: Recipient,
  //   @Param('type') type: string,
  // ): Promise<string> {
  //   return this.recipientService.updateSubscription(recipient, type);
  // }
}
