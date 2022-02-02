import { IsNotEmpty, IsEmail } from 'class-validator';
import { Post } from '../entities/post.entity';
import { Validate } from 'class-validator';
import { Unique } from 'src/validators';

export class CreatePostDto {
    @IsNotEmpty({"message" : "Enter Post Title"})
    @Validate(Unique, [Post, "title"])
    title: string;

    @IsNotEmpty({"message" : "Enter post content or description"})
    description: string;

    @IsNotEmpty({"message" : "upload an image"})
    image: string;
}
