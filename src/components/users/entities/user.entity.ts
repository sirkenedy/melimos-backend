import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({type: "varchar"})
  name: string;

  @Column({type: "varchar"})
  email: string;

  @Column({default: null, type:"boolean"})
  email_verified_at: boolean

  @Column({type: "varchar"})
  password?: string;

  @Column({type: "varchar"})
  image?: string;

  @Column({type:"datetime"})
  created_at?:  Date;

  @Column({type:"datetime"})
  updated_at?:  Date;
}