import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { AnimalEnum } from './fact-type.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Fact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  text: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  sendDate: Date;

  @Column()
  deleted: boolean;

  @Column({
    type: 'enum',
    enum: AnimalEnum,
    default: AnimalEnum.CAT,
  })
  type: AnimalEnum;

  @Column('simple-json')
  status: { verified: boolean; feedback: string; sentCount: number };

  @ManyToOne(() => User, (user) => user.facts)
  user: User;
}
