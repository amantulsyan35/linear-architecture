import { action, makeObservable, observable } from "mobx";

interface IssueType {
  id: number;
  title: string;
  assignee: string;
}

interface UserType {
  name: string;
  issues: {
    id: number;
    title: string;
  }[];
}

interface TeamType {
  name: string;
  noOfIssues: number;
  issues: IssueType[];
  users: UserType[];
}

class TaskList {
  teams: TeamType[];

  constructor(teamsArray: TeamType[]) {
    this.teams = teamsArray;
    makeObservable(this, { teams: observable, markAsComplete: action });
  }

  markAsComplete(issueId) {
    const updatedTeams = this.teams.map((team) => {
      const filteredIssues = team.issues.filter(
        (issue) => issue.id !== issueId
      );
      const noOfIssues = filteredIssues.length;

      const updatedUsers = team.users.map((user) => {
        const filteredUserIssues = user.issues.filter(
          (issue) => issue.id !== issueId
        );

        // Update user's issues with the new filtered array
        return {
          ...user,
          issues: filteredUserIssues,
        };
      });

      // Update all fields of the team with the new values
      return {
        ...team,
        noOfIssues,
        issues: filteredIssues,
        users: updatedUsers,
        // You can add more fields here and update them as needed
      };
    });

    // Find the issue in the removed issues
    const issue = this.teams.map((team) => {
      return team.issues.find((issue) => issue.id === issueId);
    })[0];

    this.teams = updatedTeams;
    return issue;
  }
}

export default TaskList;
