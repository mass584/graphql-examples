import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsNumber, MinLength } from 'class-validator';

@InputType()
export class CreateBookInput {
  @Field()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @Field()
  @IsNotEmpty()
  author: string;

  @Field(() => Number)
  @IsNumber()
  price: number;

  @Field(() => ID)
  @IsNotEmpty()
  authorId: string;
}
