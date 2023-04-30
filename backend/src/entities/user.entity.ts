import { Entity, Index, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name?: string;

  @Column()
  password: string;

  @Column()
  @Index()
  address: string;

  @Column({ nullable: true })
  privateKey?: string;
}


