# GraphQL Server Examples

このリポジトリには、3つの異なるアプローチでGraphQLサーバーを実装したサンプルが含まれています。

## プロジェクト構成

```
packages/
  ├── nestjs-graphql/       # NestJS + Apollo Serverの実装
  ├── pothos-graphql/       # Pothos + GraphQL Yogaの実装
  └── schema-first-graphql/ # Apollo Serverの実装
```

## 機能

両方の実装で以下の機能を提供しています：

- 著者（Author）の作成と取得
- 本（Book）の作成と取得
- 著者と本の関連付け（1対多の関係）

## 使い方

### NestJS + Apollo Server

```bash
# 開発サーバーの起動
npm run nestjs

# GraphQLプレイグラウンドにアクセス
open http://localhost:3000/graphql
```

### Pothos + GraphQL Yoga

```bash
# 開発サーバーの起動
npm run pothos

# GraphQLプレイグラウンドにアクセス
open http://localhost:4000/graphql
```

### schema-first + Apollo Server

```bash
# 開発サーバーの起動
npm run pothos

# GraphQLプレイグラウンドにアクセス
open http://localhost:4000/graphql
```

## 実装の違い

### NestJS + Apollo Server

- スキーマの定義はデコレータベースのCode-Firstアプローチ
- スキーマは自動生成
- NestJSのDIシステムを活用

### Pothos + GraphQL Yoga

- スキーマの定義はSchemaBuilderを使用したCode-Firstアプローチ
- スキーマは自動生成

### schema-first + Apollo Server

- スキーマの定義は手動
