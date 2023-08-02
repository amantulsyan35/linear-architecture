import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../user/user";
import { Team } from "../team/team";
import { Issue } from "../issue/issue";

@ObjectType()
export class AllData {
  @Field(() => User)
  user: User;

  @Field(() => Team)
  team: Team;

  @Field(() => Issue)
  issues: Issue;
}
