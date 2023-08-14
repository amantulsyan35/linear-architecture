interface IssueType {
  id: number;
  title: string;
  assignee: string;
}

interface UserType {
  id: number; // Adding id here
  name: string;
  issues: {
    id: number;
    title: string;
  }[];
}

interface TeamType {
  name: string;
  id: number; // Adding id here
  noOfIssues: number;
  issues: IssueType[];
  users: UserType[];
}

export function convertData(data): TeamType[] {
  const { users, issues, teams } = data;

  const issueMap = issues.reduce((map, issue) => {
    map[issue.id] = issue;
    return map;
  }, {});

  const userMap = users.reduce((map, user) => {
    map[user.id] = {
      id: user.id, // Adding id here
      name: user.name,
      issues: [],
    };
    return map;
  }, {});

  teams.forEach((team) => {
    const teamIssues = team.issues.map((issue) => {
      const { id, name } = issueMap[issue.id];
      return {
        id,
        title: name,
        assignee: team.members.find(
          (member) => member.name === issueMap[issue.id].user.name
        ).name,
      };
    });

    team.members.forEach((member) => {
      userMap[member.id].issues.push(
        ...teamIssues.filter((issue) => issue.assignee === member.name)
      );
    });
  });

  const teamTypes: TeamType[] = teams.map((team) => {
    const issues = team.issues.map((issue) => {
      const { id, name } = issueMap[issue.id];
      return {
        id,
        title: name,
        assignee: team.members.find(
          (member) => member.name === issueMap[issue.id].user.name
        ).name,
      };
    });

    const users = team.members.map((member) => ({
      id: member.id, // Adding id here
      name: member.name,
      issues: issues
        .filter((issue) => issue.assignee === member.name)
        .map((issue) => ({
          id: issue.id,
          title: issue.title,
          assignee: issue.assignee,
        })),
    }));

    return {
      id: team.id, // Adding id here
      name: team.name,
      noOfIssues: team.issues.length,
      issues,
      users,
    };
  });

  return teamTypes;
}
