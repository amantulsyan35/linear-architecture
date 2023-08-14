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

  markAsComplete(issueId: number) {
    const filteredTeams = this.teams.map((team) => {
      const filteredIssues = team.issues.filter(
        (issue) => issue.id !== issueId
      );
      return { ...team, issues: filteredIssues };
    });
    const issue = this.teams.map((team) => {
      return team.issues.find((issue) => issue.id === issueId);
    })[0];

    this.teams = filteredTeams;
    return issue;
  }
}

export default TaskList;
