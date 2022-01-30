import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users as User } from '../../users/entities/user.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at:  Date;

  @UpdateDateColumn()
  updated_at:  Date;

  @ManyToMany(() => User, user => user.roles)
  users: User[];

  // @BeforeUpdate()
  //   updateDates() {
  //     console.log("fired")
  //     this.updated_at = new Date();
  //   }
}