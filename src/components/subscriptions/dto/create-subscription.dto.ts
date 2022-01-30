import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateSubscriptionDto {
    @IsNotEmpty({"message" : "enter your email"})
    @IsEmail({"message" : "enter a vail email address"})
    email: string;
}
