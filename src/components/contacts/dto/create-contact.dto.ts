import { IsNotEmpty, IsEmail } from 'class-validator';
import { Validate } from 'class-validator';
import { Unique } from 'src/validators';

export class CreateContactDto {
    @IsNotEmpty({"message" : "Name field cannot be empty"})
    name: string;
    
    @IsNotEmpty({"message" : "Please enter your email"})
    @IsEmail({"message": "Enter a valid email"})
    email: string;

    @IsNotEmpty({"message" : "Subject field cannot be empty"})
    subject: string;

    @IsNotEmpty({"message" : "Message field cannot be empty"})
    message: string;
}
