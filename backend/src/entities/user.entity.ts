import { Entity, Index, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UserInterface } from './user.interface';

@Entity()
export class User implements UserInterface {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  password: string;

  @Column()
  @Index()
  address: string;

  @Column({ nullable: true })
  privateKey: string;
}


