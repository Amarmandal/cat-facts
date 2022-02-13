import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Recipient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true, type: 'int' })
  phoneNumber: number;

  @ManyToOne((type) => User, (user) => user.recipients)
  addedBy: User;
}
