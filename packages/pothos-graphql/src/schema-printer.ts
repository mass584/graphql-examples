import { printSchema } from "graphql";
import { writeFileSync } from "fs";
import { join } from "path";
import { schema } from "./schema";

export function printSchemaToFile() {
  const schemaString = printSchema(schema);
  const outputPath = join(__dirname, "schema.gql");
  writeFileSync(outputPath, schemaString);
  console.log(`Schema has been written to ${outputPath}`);
}
