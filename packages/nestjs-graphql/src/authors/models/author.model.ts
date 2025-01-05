import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Book } from '../../books/models/book.model';

@ObjectType()
export class Author {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [Book], { nullable: true })
  books?: Book[];
}
