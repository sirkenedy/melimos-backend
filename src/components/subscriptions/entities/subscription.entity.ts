import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({name: "subscriptions"})
export class Subscription {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    email: string;
  
    @Column({default: false})
    status: boolean;
  
    @CreateDateColumn()
    created_at:  Date;

    @UpdateDateColumn()
    updated_at:  Date;
}
