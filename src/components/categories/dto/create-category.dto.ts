import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateCategoryDto {
    @IsNotEmpty({"message" : "Name field cannot be empty"})
    name: string;
    
    @IsNotEmpty({"message" : "Description field cannot be empty"})
    description: string;
}
