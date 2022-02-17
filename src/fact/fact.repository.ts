import {
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateFactDto } from './dto/create-fact.dto';
import { FilterFactDto } from './dto/filter-fact.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { Fact } from './fact.entity';

@EntityRepository(Fact)
export class FactRepository extends Repository<Fact> {
  private readonly logger = new Logger('FactRepository', { timestamp: true });

  async getFactByFilter(filterFactDto: FilterFactDto): Promise<Fact[]> {
    const { isVerified, text, factType } = filterFactDto;
    const query = this.createQueryBuilder('fact');
    query.leftJoinAndSelect('fact.user', 'user');
    query.select([
      'fact.id',
      'fact.text',
      'fact.animalType',
      'fact.status',
      'user.firstName',
      'user.lastName',
    ]);

    if (factType) {
      query.andWhere('fact.animalType = :factType', {
        factType,
      });
    }

    if ('isVerified' in filterFactDto) {
      query.andWhere(`fact.status ->> 'verified' = :isVerified`, {
        isVerified: Boolean(parseInt(isVerified)),
      });
    }

    if (text) {
      query.andWhere('fact.text ILIKE :search ', { search: `%${text}%` });
    }

    try {
      const task = await query.getMany();
      return task;
    } catch (error) {
      this.logger.error(
        `Failed to get task. Filter: ${JSON.stringify(filterFactDto)}`,
        error.stack,
      );
    }
    throw new UnauthorizedException();
  }

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

  async updateFactStatus(
    updateStatusDto: UpdateStatusDto,
    id: string,
    user: User,
  ) {
    const { verified, feedback, sentCount } = updateStatusDto;
    const fact = await this.findOne({ id, user });

    if (!fact) {
      throw new UnauthorizedException();
    }

    if ('verified' in updateStatusDto) {
      fact.status.verified = verified;
    }

    fact.status.sentCount += sentCount || 0;
    fact.status.feedback = feedback || fact.status.feedback;

    // const query = this.query(
    //   `UPDATE public.fact
    // SET status = json_build_object('sentCount', (COALESCE(status->>'sentCount','0')::int + $1)::text::jsonb,
    // 'verified', (COALESCE($2, status->>'verified'))::text::jsonb,
    // 'feedback', (COALESCE($3, status->>'feedback'))::text
    // )
    // WHERE id = $4`,
    //   [sentCount, verified, feedback, id],
    // );

    // const query = this.createQueryBuilder()
    //   .update()
    //   // .set({ age: () => `age + ${sentCount}`, status: { verified, feedback } })
    //   .set({
    //     status: {
    //       verified,
    //       feedback,
    //     },
    //   })
    //   .where({ user, id });

    try {
      // await query;
      await this.save(fact);
      // await query.execute();
      return `Fact with id: "${id}" has been updated successfully.`;
    } catch (error) {
      this.logger.error(`Failed to update fact. Id: "${id}"`, error.stack);
      throw new UnauthorizedException();
    }
  }
}
