// user.ts
import { ObjectType, Field, ID, FieldResolver, Root } from "type-graphql";
import { Issue } from "../issue/issue";
import { Team } from "../team/team";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Team) // Forward declaration using function signature
  team: () => Team;

  @Field(() => [Issue], { nullable: true })
  issues: Issue[];
}
