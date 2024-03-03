import Link from "next/link";

export default function Home() {
  const image = "/assets/notepad.png";

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="grid grid-cols-2">
        <div>
          <img src={image} alt="notepad icon" />
        </div>
        <div className = "text-center flex flex-col items-center justify-center">
          <h1 className="text-3xl text-green-400">
            Taskify
          </h1>
          <p className="mt-5 text-white">Your Trusted Task Tracker</p>
          <button className="mt-8 rounded-md bg-blue-400 hover:bg-blue-500 p-2 text-white">
            <Link href = "view">Get Started</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
