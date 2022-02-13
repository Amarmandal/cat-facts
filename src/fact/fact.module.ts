import { Module } from '@nestjs/common';
import { FactService } from './fact.service';
import { FactController } from './fact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fact } from './fact.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fact])],
  providers: [FactService],
  controllers: [FactController],
})
export class FactModule {}
