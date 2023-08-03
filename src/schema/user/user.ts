// user.ts
import { ObjectType, Field, ID } from "type-graphql";
import { Issue } from "../issue/issue";
import { Team } from "../team/team";

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => Team) // Forward declaration using function signature
  team: () => Team;

  @Field(() => [Issue])
  issues: Issue[];
}
