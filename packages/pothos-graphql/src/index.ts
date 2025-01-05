import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./schema";
import { Author, Book } from "./types";
import { printSchemaToFile } from "./schema-printer";

// スキーマファイルを生成
printSchemaToFile();

// インメモリデータストア
const authors: Author[] = [];
const books: Book[] = [];

const yoga = createYoga({
  schema,
  context: {
    authors,
    books,
  },
});

const server = createServer(yoga);

server.listen(4000, () => {
  console.log("Server is running on http://localhost:4000/graphql");
});
