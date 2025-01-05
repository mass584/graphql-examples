import {
  Args,
  ID,
  Mutation,
  Query,
  Resolver,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { Inject, forwardRef } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { Author } from './models/author.model';
import { CreateAuthorInput } from './dto/create-author.input';
import { BooksService } from '../books/books.service';
import { Book } from '../books/models/book.model';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(
    private readonly authorsService: AuthorsService,
    @Inject(forwardRef(() => BooksService))
    private readonly booksService: BooksService,
  ) {}

  @Query(() => [Author])
  authors(): Author[] {
    return this.authorsService.findAll();
  }

  @Query(() => Author)
  author(@Args('id', { type: () => ID }) id: string): Author {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author)
  createAuthor(
    @Args('createAuthorInput') createAuthorInput: CreateAuthorInput,
  ): Author {
    return this.authorsService.create(createAuthorInput);
  }

  @ResolveField('books', () => [Book])
  async getBooks(@Parent() author: Author) {
    return this.booksService.findByAuthorId(author.id);
  }
}
