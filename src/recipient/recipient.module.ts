import { Module } from '@nestjs/common';
import { RecipientService } from './recipient.service';
import { RecipientController } from './recipient.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipientRepository } from './recipient.repository';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecipientRepository]),
    AuthModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [RecipientService],
  controllers: [RecipientController],
})
export class RecipientModule {}
