import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/user.entity';
import { AnimalEnum } from 'src/fact/fact-type.enum';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, type: 'numeric' })
  phoneNumber: number;

  @Column()
  password: string;

  @ManyToOne((_type) => User, (user) => user.recipients)
  addedBy: User;

  @Column({ type: 'simple-array', default: AnimalEnum.CAT })
  subscriptions: Array<string>;
}
