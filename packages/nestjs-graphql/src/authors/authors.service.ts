import { Injectable } from '@nestjs/common';
import { Author } from './models/author.model';
import { CreateAuthorInput } from './dto/create-author.input';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthorsService {
  private authors: Author[] = [];

  findAll(): Author[] {
    return this.authors;
  }

  findOne(id: string): Author {
    return this.authors.find((author) => author.id === id);
  }

  create(createAuthorInput: CreateAuthorInput): Author {
    const author = {
      id: uuidv4(),
      ...createAuthorInput,
      books: [],
    };
    this.authors.push(author);
    return author;
  }
}
