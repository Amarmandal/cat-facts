import { Entity, Column, ManyToOne } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Entity()
export class Recipient {
  @Column()
  name: string;

  @Column({ unique: true, type: 'int', length: 10 })
  phoneNumber: number;

  @ManyToOne(() => User, (user) => user.recipients)
  addedBy: User;
}
