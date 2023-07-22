import { NextPage } from "next";
import { useQuery, withWunderGraph } from "components/generated/nextjs";

const Home: NextPage = () => {
  const { data: taskObjectPool } = useQuery({
    operationName: "tasks/getTaskData",
  });

  console.log(taskObjectPool);

  // const teamsArray = [
  //   {
  //     name: "Team Linear",
  //     noOfIssues: 2,
  //     issues: [
  //       {
  //         id: 1,
  //         title: "I-1 Bug",
  //         assignee: "Aman",
  //       },
  //       {
  //         id: 2,
  //         title: "I-2 Bug",
  //         assignee: "Aman",
  //       },
  //     ],
  //     users: [
  //       {
  //         name: "Aman",
  //         issues: [
  //           {
  //             id: 1,
  //             title: "I-1 Bug",
  //           },
  //           {
  //             id: 2,
  //             title: "I-2 Bug",
  //           },
  //         ],
  //       },
  //       {
  //         name: "Ravi",
  //         issues: [],
  //       },
  //     ],
  //   },
  // ];

  return (
    <div>
      <h1>{JSON.stringify(taskObjectPool)}</h1>
    </div>
  );
};

export default withWunderGraph(Home);
