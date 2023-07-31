import { ObjectType, Field, ID } from "type-graphql";
import { Team } from "../team/team";
// import { User } from "../user/user";

@ObjectType()
export class Issue {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  // @Field(() => User)
  // user: User;

  @Field(() => Team)
  team: Team;
}
