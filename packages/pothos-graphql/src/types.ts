export interface Author {
  id: string;
  name: string;
  email: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  authorId: string;
}

export interface Context {
  authors: Author[];
  books: Book[];
}
