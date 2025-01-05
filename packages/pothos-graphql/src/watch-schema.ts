import { watch } from "fs";
import { join } from "path";
import { printSchemaToFile } from "./schema-printer";

const schemaDir = join(__dirname);

// 初回生成
printSchemaToFile();

// ファイルの変更を監視
watch(schemaDir, (eventType, filename) => {
  if (filename === "schema.ts") {
    console.log("Schema file changed, regenerating schema.gql...");
    printSchemaToFile();
  }
});
