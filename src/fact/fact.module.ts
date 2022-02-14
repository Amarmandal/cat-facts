import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactController } from './fact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { FactRepository } from './fact.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([FactRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [FactService],
  controllers: [FactController],
})
export class FactModule {}
