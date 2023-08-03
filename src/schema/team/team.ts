// team.ts
import { ObjectType, Field, ID, FieldResolver, Root } from "type-graphql";
import { Issue } from "../issue/issue";
import { User } from "../user/user";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@ObjectType()
export class Team {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => [User])
  members: User[];

  @Field(() => [Issue])
  issues: Issue[];
}
