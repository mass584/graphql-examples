import { ApolloServer } from "apollo-server";
import { readFileSync } from "fs";
import { join } from "path";
import { resolvers } from "./resolvers";

// スキーマの読み込み
const typeDefs = readFileSync(join(__dirname, "schema.graphql"), "utf-8");

// サーバーの作成
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// サーバーの起動
server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀 Server ready at ${url}`);
});
