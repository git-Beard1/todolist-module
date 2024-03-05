import Link from "next/link";
import ViewTasks from "../../_components/view-tasks";

export default function AdminPage() {
  return (
    <div className="container">
      <h1 className="mb-8 mt-8 text-center text-3xl text-white">
        View All Tasks
      </h1>
      <ViewTasks></ViewTasks>
      <div className="flex justify-center mt-4">
        <button className="rounded-md bg-blue-400 p-2 text-white hover:bg-blue-500">
          <Link href="/create">Create Task</Link>
        </button>
      </div>
    </div>
  );
}
