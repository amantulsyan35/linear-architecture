import { useMemo } from "react";
import { NextPage } from "next";
import { useQuery, useMutation } from "@apollo/client";
import { observer } from "mobx-react";
import { gql } from "@apollo/client";
import TaskList from "../models/TaskStore";
import { GET_DATA } from "../src/queries/get";
import { UPDATE_DATABASE_MUTATION } from "../src/queries/update";
import { convertData } from "../utils/convertDataType";

const Home: NextPage = () => {
  const { data: objectPool } = useQuery(GET_DATA);
  const objectGraph = objectPool ? convertData(objectPool) : [];
  const taskList = useMemo(() => new TaskList(objectGraph), [objectPool]);

  const [markComplete, { loading, error, data: responseData }] = useMutation(
    gql`
      mutation MarkComplete($data: [TeamInput!]!) {
        markComplete(data: $data)
      }
    `
  );

  // const handleMutation = async () => {
  //   try {
  //     taskList.markAsComplete(id);

  //     const response = await markComplete({
  //       variables: {
  //         data: [
  //           {
  //             id: 1,
  //             name: "Team Linear",
  //             noOfIssues: 2,
  //             issues: [
  //               {
  //                 id: 2,
  //                 title: "I-2 Bug",
  //                 assignee: "Aman",
  //               },
  //             ],
  //             users: [
  //               {
  //                 name: "Aman",
  //                 id: 1, // This should be the user's existing ID if the user already exists
  //                 issues: [
  //                   {
  //                     id: 1,
  //                     title: "I-1 Bug",
  //                     assignee: "Aman", // Make sure to provide the assignee field
  //                   },
  //                   {
  //                     id: 2,
  //                     title: "I-2 Bug",
  //                     assignee: "Aman", // Make sure to provide the assignee field
  //                   },
  //                 ],
  //               },
  //               {
  //                 name: "Ravi",
  //                 issues: [], // You can omit the id field for new users
  //               },
  //             ],
  //           },
  //         ],
  //       },
  //     });

  //     if (error) {
  //       console.log(error);
  //     }
  //     console.log(responseData);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleMutation = async () => {
    try {
      const response = await markComplete({
        variables: {
          data: [
            {
              id: 1,
              name: "Team Linear",
              noOfIssues: 2,
              issues: [
                {
                  id: 2,
                  title: "I-2 Bug",
                  assignee: "Aman",
                },
              ],
              users: [
                {
                  name: "Aman",
                  id: 1,
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
                },
                {
                  name: "Ravi",
                  issues: [],
                },
              ],
            },
          ],
        },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="">
      <div className="border-2 min-h-screen p-4">
        <h1 className="mb-4 text-2xl">View Layer</h1>
        {taskList?.teams.map((t, i) => {
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
                      onClick={handleMutation}
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
