import { IsNotEmpty, IsEmail } from 'class-validator';
import { Blog } from '../entities/blog.entity';
import { Validate } from 'class-validator';
import { Unique } from 'src/validators';

export class CreateBlogDto {
    @IsNotEmpty({"message" : "Enter Post Title"})
    @Validate(Unique, [Blog, "title"])
    title: string;

    @IsNotEmpty({"message" : "Enter post content or description"})
    description: string;

    @IsNotEmpty({"message" : "upload an image"})
    image: string;

    @IsNotEmpty({"message" : "unauthrorized user"})
    user: string;

    // @IsNotEmpty({"message" : "Dunauthrorized user"})
    // keywords: string;

    // @IsNotEmpty({"message" : "Dunauthrorized user"})
    // publiahed: boolean;
}
