import "reflect-metadata";
import { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { buildSchema } from "type-graphql";
// import { resolvers } from "@generated/type-graphql";
import { UserResolver } from "../../src/schema/user/user.resolver";

const schema = await buildSchema({
  resolvers: [UserResolver],
});

// const schema = await buildSchema({
//   resolvers,
//   emitSchemaFile: true,
// });

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startServer = server.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
}
