import { useMemo } from "react";
import { NextPage } from "next";
import { useQuery } from "@apollo/client";
import { observer } from "mobx-react";
import TaskList from "../models/TaskStore";
import { GET_DATA } from "../src/queries/get";
import { convertData } from "../utils/convertDataType";

const Home: NextPage = () => {
  const { data: objectPool } = useQuery(GET_DATA);
  const objectGraph = objectPool ? convertData(objectPool) : [];
  const taskList = useMemo(() => new TaskList(objectGraph), [objectPool]);

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
                      onClick={() => {
                        taskList.markAsComplete(i.id);
                      }}
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
