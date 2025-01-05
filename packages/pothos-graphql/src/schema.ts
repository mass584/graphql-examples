import { builder } from "./builder";
import { v4 as uuidv4 } from "uuid";

// Author型の定義
builder.objectType("Author", {
  description: "著者の情報を表す型",
  fields: (t) => ({
    id: t.exposeID("id", { description: "著者のID" }),
    name: t.exposeString("name", { description: "著者の名前" }),
    email: t.exposeString("email", { description: "著者のメールアドレス" }),
    books: t.field({
      type: ["Book"],
      description: "著者が書いた本のリスト",
      resolve: (author, _, context) => {
        return context.books.filter((book) => book.authorId === author.id);
      },
    }),
  }),
});

// Book型の定義
builder.objectType("Book", {
  description: "本の情報を表す型",
  fields: (t) => ({
    id: t.exposeID("id", { description: "本のID" }),
    title: t.exposeString("title", { description: "本のタイトル" }),
    author: t.exposeString("author", { description: "著者名" }),
    price: t.exposeFloat("price", { description: "本の価格" }),
    authorId: t.exposeID("authorId", { description: "著者のID" }),
    bookAuthor: t.field({
      type: "Author",
      description: "本の著者の詳細情報",
      nullable: true,
      resolve: (book, _, context) => {
        return context.authors.find((author) => author.id === book.authorId);
      },
    }),
  }),
});

// Query型の定義
builder.queryType({
  fields: (t) => ({
    authors: t.field({
      type: ["Author"],
      description: "全ての著者を取得",
      resolve: (_, __, context) => context.authors,
    }),
    author: t.field({
      type: "Author",
      description: "指定したIDの著者を取得",
      nullable: true,
      args: {
        id: t.arg.string({ required: true, description: "著者のID" }),
      },
      resolve: (_, { id }, context) => {
        return context.authors.find((author) => author.id === id);
      },
    }),
    books: t.field({
      type: ["Book"],
      description: "全ての本を取得",
      resolve: (_, __, context) => context.books,
    }),
    book: t.field({
      type: "Book",
      description: "指定したIDの本を取得",
      nullable: true,
      args: {
        id: t.arg.string({ required: true, description: "本のID" }),
      },
      resolve: (_, { id }, context) => {
        return context.books.find((book) => book.id === id);
      },
    }),
  }),
});

// Mutation型の定義
builder.mutationType({
  fields: (t) => ({
    createAuthor: t.field({
      type: "Author",
      description: "新しい著者を作成",
      args: {
        name: t.arg.string({
          required: true,
          description: "著者の名前",
          validate: { minLength: 2 },
        }),
        email: t.arg.string({
          required: true,
          description: "著者のメールアドレス",
          validate: { email: true },
        }),
      },
      resolve: (_, { name, email }, context) => {
        const author = { id: uuidv4(), name, email };
        context.authors.push(author);
        return author;
      },
    }),
    createBook: t.field({
      type: "Book",
      description: "新しい本を作成",
      args: {
        title: t.arg.string({
          required: true,
          description: "本のタイトル",
          validate: { minLength: 3 },
        }),
        author: t.arg.string({
          required: true,
          description: "著者名",
        }),
        price: t.arg.float({
          required: true,
          description: "本の価格",
          validate: { min: 0 },
        }),
        authorId: t.arg.string({
          required: true,
          description: "著者のID",
        }),
      },
      resolve: (_, { title, author, price, authorId }, context) => {
        const existingAuthor = context.authors.find((a) => a.id === authorId);
        if (!existingAuthor) {
          throw new Error(`Author with ID ${authorId} not found`);
        }

        const book = { id: uuidv4(), title, author, price, authorId };
        context.books.push(book);
        return book;
      },
    }),
  }),
});

export const schema = builder.toSchema();
