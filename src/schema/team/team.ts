import { ObjectType, Field, ID } from "type-graphql";
// import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Issue } from "../issue/issue";
import { User } from "../user/user";

// @Entity()
@ObjectType()
export class Team {
  // @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: string;

  // @Column()
  @Field(() => String)
  name: string;

  // @OneToMany(() => User, (user) => user.team)
  @Field(() => [User])
  members: User[];

  @Field(() => [Issue])
  issues: Issue[];
}
