import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactController } from './fact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fact } from './fact.entity';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Fact]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [FactService],
  controllers: [FactController],
})
export class FactModule {}
