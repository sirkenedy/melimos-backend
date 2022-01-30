import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Blog } from '../../blogs/entities/blog.entity';

@Entity({name: "categories"})
export class Category {
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

    @ManyToMany(() => Blog, blog => blog.categories)
    blogs: Blog[];
}
