import { Roles as Role } from './../../roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, RelationId, UpdateDateColumn, CreateDateColumn } from 'typeorm';

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

  @CreateDateColumn()
  created_at?:  Date;

  @UpdateDateColumn()
  updated_at?:  Date;
  
  @ManyToMany(() => Role, role => role.users, {
    eager: true,
    cascade: true,
  })
  @JoinTable({
    name: "role_user",
    joinColumn: {
      name: "userId",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
        name: "roleId",
        referencedColumnName: "id"
    }
  })
  roles: Role[];

  @RelationId((user: Users) => user.roles)
  rolesIds: number[];
}