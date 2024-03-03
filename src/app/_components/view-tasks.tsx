import { api } from "@/trpc/server";
import React from "react";

const ViewTasks: React.FC = async () => {
  const tasks = await api.task.getAllTask.query();
  return (
    <div className="flex justify-center">
      {tasks && tasks.length !== 0 ? (
        <div className="max-w-sm">
          {tasks.map((task) => (
            <div className="mb-3 rounded-md border border-black bg-slate-100 p-3 text-center">
              <h1 className="mb-6 mt-2 text-xl font-bold">{task.title}</h1>
              <p className="mt-3">{task.content}</p>
              <div className="mt-6 grid grid-cols-2  gap-4">
                <div>
                  <div>
                    <p className="text-blue-500">Started</p>
                    <span className="text-xs">
                      {new Date(task.startDate).toLocaleString()}
                    </span>
                  </div>
                </div>
                <div>
                  <div>
                    <p className="text-red-500">Finish By</p>
                    <span className="text-xs">
                      {new Date(task.deadline).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="mt-6 text-center text-lg text-white">
          You have no tasks to complete.
        </h1>
      )}
    </div>
  );
};

export default ViewTasks;
