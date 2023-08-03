import { ObjectType, Field, ID } from "type-graphql";
import { User } from "../user/user";
import { Team } from "../team/team";
import { Issue } from "../issue/issue";

@ObjectType()
export class AllData {
  @Field(() => [User])
  users: User[];

  @Field(() => [Team])
  teams: Team[];

  @Field(() => [Issue])
  issues: Issue[];
}
