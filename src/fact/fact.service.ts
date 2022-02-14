import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';
import { CreateFactDto } from './dto/create-fact.dto';
import { Fact } from './fact.entity';
import { FactRepository } from './fact.repository';

@Injectable()
export class FactService {
  private readonly logger = new Logger();

  constructor(
    @InjectRepository(FactRepository)
    private readonly factRepository: FactRepository,
  ) {}

  createFact(createFactDto: CreateFactDto, user: User): Promise<Fact> {
    return this.factRepository.createFact(createFactDto, user);
  }

  async deleteFact(id: string, user: User): Promise<string> {
    const task = await this.factRepository.delete({ id, user });
    if (task.affected) {
      return `Task with id: "${id}" successfully deleted!`;
    } else {
      this.logger.error(`Failed to deleted task: "${id}"`);
      return `Failed! to deleted task "${id}"`;
    }
  }
}
