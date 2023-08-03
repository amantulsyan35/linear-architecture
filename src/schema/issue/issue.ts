// issue.ts
import { ObjectType, Field, ID } from "type-graphql";
import { Team } from "../team/team";
import { User } from "../user/user";

@ObjectType()
export class Issue {
  @Field(() => ID)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => Team) // Forward declaration using function signature
  team: () => Team;

  @Field(() => User) // Forward declaration using function signature
  user: () => User;
}
