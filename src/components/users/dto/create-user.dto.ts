import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { Unique, Exist } from 'src/validators';
import { Users as User } from '../entities/user.entity';
import { Validate } from 'class-validator';
import { Roles as Role } from '../../roles/entities/role.entity'

export class CreateUserDto {
    @IsNotEmpty({"message" : "Name field cannot be empty"})
    name: string;
    
    @IsEmail({"message" : "Enter a valid email adress"})
    @Validate(Unique, [User, "email"])
    email: string;
    
    @IsNotEmpty({"message" : "Password field cannot be empty"})
    password: string;
}
