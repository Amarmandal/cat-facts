import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Fact } from 'src/fact/fact.entity';
import { Recipient } from 'src/recipient/recipient.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @OneToMany((_type) => Fact, (fact) => fact.user, { eager: true })
  facts: Fact[];

  @OneToMany((_type) => Recipient, (recipient) => recipient.addedBy, {
    eager: true,
  })
  recipients: Recipient[];
}
