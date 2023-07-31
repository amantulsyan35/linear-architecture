import { Resolver, Query, Arg } from "type-graphql";
import { User } from "./user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Resolver(User)
export class UserResolver {
  @Query(() => [User])
  async users() {
    const users = await prisma.user.findMany();
    return users;
  }
}
