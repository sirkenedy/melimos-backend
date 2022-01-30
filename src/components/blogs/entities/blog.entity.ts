import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, BeforeUpdate, ManyToOne, CreateDateColumn, UpdateDateColumn, BeforeInsert } from 'typeorm';
import { Users as User } from '../../users/entities/user.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity({name: "blogs"})
export class Blog {
    @PrimaryGeneratedColumn('increment')
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    slug: string;
  
    @Column()
    description: string;
  
    @CreateDateColumn()
    created_at:  Date;

    @UpdateDateColumn()
    updated_at:  Date;
  
    @ManyToOne(() => User, user => user.blogs)
    user: User;

    @ManyToMany(() => Category, category => category.blogs, {
      eager: true,
      cascade: true,
    })
    @JoinTable({
      name: "blog_category",
      joinColumn: {
        name: "blogId",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
          name: "CategoryId",
          referencedColumnName: "id"
      }
    })
    categories: Category[];

    @BeforeInsert()
      @BeforeUpdate()
        addSlug() {
          this.slug = (this.title).toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
        }

    // @ManyToMany(() => Tag, tag => tag.posts, {
    //     eager: true,
    //     cascade: true,
    //   })
    // tags: Tag[];

    // @OneToMany(() => PComment, comment => comment.posts, {
    //     eager: true,
    //     cascade: true,
    //   })
    // comments: PComment[];
}
