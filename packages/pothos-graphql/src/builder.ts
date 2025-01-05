import SchemaBuilder from "@pothos/core";
import ValidationPlugin from "@pothos/plugin-validation";
import { Author, Book, Context } from "./types";

export const builder = new SchemaBuilder<{
  Objects: {
    Author: Author;
    Book: Book;
  };
  Context: Context;
}>({
  plugins: [ValidationPlugin],
  validationOptions: {
    validationError: (error) => {
      if (error.errors) {
        return new Error(error.errors.map((e) => e.message).join("\n"));
      }
      return new Error(error.message);
    },
  },
});
