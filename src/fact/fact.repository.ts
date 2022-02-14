import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFactDto } from './dto/create-fact.dto';
import { Fact } from './fact.entity';

@EntityRepository(Fact)
export class FactRepository extends Repository<Fact> {
  private readonly logger = new Logger();

  async createFact(createFactDto: CreateFactDto, user: User): Promise<Fact> {
    const fact = this.create({
      ...createFactDto,
      user,
      sendDate: new Date(),
      status: {
        verified: true,
        feedback: '',
        sentCount: 0,
      },
    });

    try {
      await this.save(fact);
      fact.user = undefined;
      return fact;
    } catch (error) {
      this.logger.error(
        `Failed! to create a fact. ${JSON.stringify(createFactDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
