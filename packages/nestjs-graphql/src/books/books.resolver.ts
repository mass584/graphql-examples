import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './models/book.model';
import { CreateBookInput } from './dto/create-book.input';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Query(() => [Book])
  books(): Book[] {
    return this.booksService.findAll();
  }

  @Query(() => Book)
  book(@Args('id', { type: () => ID }) id: string): Book {
    return this.booksService.findOne(id);
  }

  @Mutation(() => Book)
  createBook(@Args('createBookInput') createBookInput: CreateBookInput): Book {
    return this.booksService.create(createBookInput);
  }
}
