import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Users as User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity({name: "contacts"})
export class Contact {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    name: string;
  
    @Column()
    email: string;
  
    @Column()
    subject: string;
  
    @Column()
    message: string;
  
    @Exclude()
    status: boolean;
  
    @CreateDateColumn()
    created_at:  Date;

    @UpdateDateColumn()
    updated_at:  Date;

    constructor(partial: Partial<Contact>) {
        Object.assign(this, partial);
    }
}
