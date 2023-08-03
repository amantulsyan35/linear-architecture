// team.ts
import { ObjectType, Field, ID } from "type-graphql";
import { Issue } from "../issue/issue";
import { User } from "../user/user";

@ObjectType()
export class Team {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => [User])
  members: User[];

  @Field(() => [Issue])
  issues: Issue[];
}
