import { NextPage } from "next";
import { useQuery, dehydrate } from "react-query";
import { observer } from "mobx-react";
import TaskList from "../models/TaskStore";
import { PrismaClient } from "@prisma/client";
import { getData, queryClient } from "../src/api";

const teamsArray = [
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

const taskList = new TaskList(teamsArray);

const Home: NextPage = () => {
  const { data } = useQuery(["allData"], () => getData());

  console.log(data);
  // const { data: taskObjectPool } = useQuery({
  //   operationName: "tasks/getTaskData",
  // });

  return (
    <main className="">
      <div className="border-2 min-h-screen p-4">
        <h1 className="mb-4 text-2xl">View Layer</h1>
        {taskList.teams.map((t, i) => {
          return (
            <div key={i} className="border-2 w-1/4 p-4 flex flex-col gap-3">
              <h2 className="text-lg font-semibold">{t.name}</h2>
              <p>You have {t.noOfIssues} active issues</p>
              {t.issues.map((i, idx) => {
                return (
                  <div
                    key={idx}
                    className="border-2 p-1 ml-2 cursor-pointer hover:border-gray-400 "
                  >
                    <p>
                      {i.id} {i.title}
                    </p>
                    <p>Assignee: {i.assignee}</p>
                    <button
                      type="button"
                      onClick={() => taskList.markAsComplete(i.id)}
                      className="rounded bg-green-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                    >
                      Mark Complete
                    </button>
                  </div>
                );
              })}
              <h3 className="font-semibold">Team Members</h3>
              <div>
                {t.users.map((u, i) => {
                  return (
                    <div key={i} className="flex ml-2 items-center gap-1">
                      <p>{u.name}:</p>
                      <p>{u.issues.length} active issues</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default observer(Home);

export async function getServerSideProps() {
  await queryClient.prefetchQuery("allData", () => getData());

  const prisma = new PrismaClient();

  const users = await prisma.user.findMany({
    include: { team: true, issues: true },
  });

  console.log({ data: users[0].issues });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}
