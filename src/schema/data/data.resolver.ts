import {
  Resolver,
  Query,
  FieldResolver,
  Root,
  Mutation,
  Arg,
} from "type-graphql";
import { User } from "../user/user";
import { Team } from "../team/team";
import { Issue } from "../issue/issue";
import { PrismaClient } from "@prisma/client";
import { AllData } from "./data";

const prisma = new PrismaClient();

@Resolver()
export class DataResolver {
  @Query(() => [User])
  async users() {
    const users = await prisma.user.findMany({
      include: { team: true, issues: true },
    });

    users.forEach((user) => {
      if (user.issues === null) {
        user.issues = [];
      }
    });

    console.log(users);

    return users;
  }

  @Query(() => [Team])
  async teams() {
    const teams = await prisma.team.findMany({
      include: { members: true, issues: true },
    });
    return teams;
  }

  @Query(() => [Issue])
  async issues() {
    const issues = await prisma.issue.findMany({
      include: { team: true, user: true },
    });
    return issues;
  }

  @Query(() => [AllData])
  async allData() {
    const users = await this.users();
    const teams = await this.teams();
    const issues = await this.issues();
    // If a user has no issues, set the issues to an empty array
    users.forEach((user) => {
      if (!user.issues) {
        return (user.issues = []);
      }
    });

    return {
      users,
      teams,
      issues,
    };
  }

  // @Mutation(() => String) // Return type can be customized based on your use case
  // async markComplete(
  //   @Arg("data", () => [TeamInput]) data: TeamInput[]
  // ): Promise<string> {
  //   await prisma.$transaction(async (prisma) => {
  //     for (const teamData of data) {
  //       const team = await prisma.team.upsert({
  //         where: { id: teamData.id },
  //         update: {},
  //         create: { name: teamData.name },
  //       });

  //       for (const userData of teamData.users) {
  //         const user = await prisma.user.upsert({
  //           where: { id: userData.id },
  //           update: {},
  //           create: {
  //             name: userData.name,
  //             team: { connect: { id: team.id } },
  //           },
  //         });

  //         for (const issueData of userData.issues) {
  //           await prisma.issue.upsert({
  //             where: { id: issueData.id },
  //             update: {},
  //             create: {
  //               id: issueData.id,
  //               name: issueData.title,
  //               userId: user.id,
  //               teamId: team.id,
  //             },
  //           });
  //         }
  //       }
  //     }
  //   });

  //   return "Transaction Successful";
  // }
}
