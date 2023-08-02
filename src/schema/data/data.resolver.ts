import { Resolver, Query, Arg } from "type-graphql";
import { AllData } from "./data";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

@Resolver(AllData)
export class DataResolver {
  @Query(() => [AllData])
  async allData() {
    const users = await prisma.user.findMany({
      include: { team: true, issues: true },
    });
    const teams = await prisma.team.findMany({
      include: { members: true, issues: true },
    });
    const issues = await prisma.issue.findMany({
      include: { team: true, user: true },
    });
    return [users, teams, issues];
  }
}
