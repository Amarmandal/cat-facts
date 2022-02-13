import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recipient } from './recipient.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recipient])],
  providers: [RecipientService],
  controllers: [RecipientController],
})
export class RecipientModule {}
