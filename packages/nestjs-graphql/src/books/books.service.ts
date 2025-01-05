import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { Book } from './models/book.model';
import { CreateBookInput } from './dto/create-book.input';
import { v4 as uuidv4 } from 'uuid';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {
  private books: Book[] = [];

  constructor(
    @Inject(forwardRef(() => AuthorsService))
    private readonly authorsService: AuthorsService,
  ) {}

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: string): Book {
    return this.books.find((book) => book.id === id);
  }

  findByAuthorId(authorId: string): Book[] {
    return this.books.filter((book) => book.authorId === authorId);
  }

  create(createBookInput: CreateBookInput): Book {
    const author = this.authorsService.findOne(createBookInput.authorId);
    if (!author) {
      throw new NotFoundException(
        `Author with ID ${createBookInput.authorId} not found`,
      );
    }

    const book = {
      id: uuidv4(),
      ...createBookInput,
      bookAuthor: author,
    };
    this.books.push(book);
    return book;
  }
}
