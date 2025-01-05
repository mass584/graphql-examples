import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/models/author.model';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  author: string;

  @Field(() => Number)
  price: number;

  @Field(() => ID)
  authorId: string;

  @Field(() => Author, { nullable: true })
  bookAuthor?: Author;
}
