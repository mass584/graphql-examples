import { v4 as uuidv4 } from "uuid";

// 型定義
interface Author {
  id: string;
  name: string;
  email: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  authorId: string;
}

// インメモリデータストア
let authors: Author[] = [];

let books: Book[] = [];

export const resolvers = {
  Query: {
    authors: () => authors,
    author: (_: unknown, { id }: { id: string }) =>
      authors.find((author) => author.id === id),
    books: () => books,
    book: (_: unknown, { id }: { id: string }) =>
      books.find((book) => book.id === id),
  },

  Mutation: {
    createAuthor: (
      _: unknown,
      { name, email }: { name: string; email: string }
    ) => {
      const author: Author = {
        id: uuidv4(),
        name,
        email,
      };
      authors.push(author);
      return author;
    },

    createBook: (
      _: unknown,
      {
        title,
        author,
        price,
        authorId,
      }: { title: string; author: string; price: number; authorId: string }
    ) => {
      const existingAuthor = authors.find((a) => a.id === authorId);
      if (!existingAuthor) {
        throw new Error(`Author with ID ${authorId} not found`);
      }

      const book: Book = {
        id: uuidv4(),
        title,
        author,
        price,
        authorId,
      };
      books.push(book);
      return book;
    },
  },

  Author: {
    books: (author: Author) =>
      books.filter((book) => book.authorId === author.id),
  },

  Book: {
    bookAuthor: (book: Book) =>
      authors.find((author) => author.id === book.authorId),
  },
};
