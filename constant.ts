export const teamsArray = [
  {
    name: "Team Linear",
    noOfIssues: 2,
    issues: [
      {
        id: 1,
        title: "I-1 Bug",
        assignee: "Aman",
      },
      {
        id: 2,
        title: "I-2 Bug",
        assignee: "Aman",
      },
    ],
    users: [
      {
        name: "Aman",
        issues: [
          {
            id: 1,
            title: "I-1 Bug",
          },
          {
            id: 2,
            title: "I-2 Bug",
          },
        ],
      },
      {
        name: "Ravi",
        issues: [],
      },
    ],
  },
];

const objectPool = {
  users: [
    {
      id: "1",
      name: "Aman",
      team: {
        id: "1",
        name: "Linear",
      },
    },
    {
      id: "2",
      name: "Ravi",
      team: {
        id: "1",
        name: "Linear",
      },
    },
  ],
  issues: [
    {
      id: "1",
      name: "I-1 Bug",
      user: {
        id: "1",
        name: "Aman",
      },
      team: {
        id: "1",
        name: "Linear",
      },
    },
    {
      id: "2",
      name: "I-2 Bug",
      user: {
        id: "1",
        name: "Aman",
      },
      team: {
        id: "1",
        name: "Linear",
      },
    },
  ],
  teams: [
    {
      id: "1",
      name: "Linear",
      members: [
        {
          id: "1",
          name: "Aman",
        },
        {
          id: "2",
          name: "Ravi",
        },
      ],
      issues: [
        {
          id: "1",
          name: "I-1 Bug",
        },
        {
          id: "2",
          name: "I-2 Bug",
        },
      ],
    },
  ],
};
