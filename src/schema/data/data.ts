import { ObjectType, Field, InputType, Int } from "type-graphql";
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

@InputType()
class IssueInput {
  @Field(() => Int)
  id?: number;

  @Field()
  title: string;

  @Field()
  assignee: string;
}

@InputType()
class UserInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field()
  name: string;

  @Field(() => [IssueInput])
  issues: IssueInput[];
}

@InputType()
export class TeamInput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => Int)
  noOfIssues: number;

  @Field(() => [IssueInput])
  issues: IssueInput[];

  @Field(() => [UserInput])
  users: UserInput[];
}
