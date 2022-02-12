import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';

@Module({
  providers: [RecipientService],
  controllers: [RecipientController],
})
export class RecipientModule {}
