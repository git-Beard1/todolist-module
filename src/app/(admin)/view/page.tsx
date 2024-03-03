import Link from "next/link";
import ViewTasks from "../../_components/view-tasks";

export default function AdminPage() {
  return (
    <div className="container">
      <button className="mt-8 ml-4 rounded-md bg-blue-400 p-2 text-white hover:bg-blue-500">
        <Link href="/">Home</Link>
      </button>
      <h1 className="mb-8 mt-8 text-center text-3xl text-white">
        View All Tasks
      </h1>
      <ViewTasks></ViewTasks>
    </div>
  );
}
