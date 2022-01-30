import { IsNotEmpty, IsEmail } from 'class-validator';
import { Roles as Role } from '../entities/role.entity';
import { Validate } from 'class-validator';
import { Unique } from 'src/validators';

export class CreateRoleDto {
    @IsNotEmpty({"message" : "Name field cannot be empty"})
    @Validate(Unique, [Role, "name"])
    name: string;
    
    @IsNotEmpty({"message" : "Description field cannot be empty"})
    description: string;
}
