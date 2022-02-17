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

  @Column({ default: new Date().toDateString() })
  sendDate: Date;

  @Column({ default: false })
  deleted: boolean;

  @Column({
    type: 'enum',
    enum: AnimalEnum,
    default: AnimalEnum.CAT,
  })
  animalType: AnimalEnum;

  @Column({ type: 'jsonb' })
  status: { verified: boolean; feedback: string; sentCount: number };

  @Column({ default: 0 })
  age: number;

  @ManyToOne((_type) => User, (user) => user.facts)
  user: User;
}
