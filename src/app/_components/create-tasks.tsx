"use client";

import { useState } from "react";
import Link from "next/link";
import { api } from "@/trpc/react";

import { Button } from "../../components/ui/button";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { string } from "zod";
import { start } from "repl";

const CreateTasks: React.FC = () => {
  const [taskData, setTaskData] = useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });

  const [startDate, setStartDate] = useState<Date | undefined>();
  const [deadline, setDeadline] = useState<Date | undefined>();

  const [textMessage, setTextMessage] = useState<string | null>(null);

  const { mutate: createTask } = api.task.createdTask.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { title, content } = taskData;

    if (!taskData.title || !taskData.content) {
      setTextMessage("Error: Please fill in both title and content.");
      return;
    }

    try {
      createTask(
        {
          title,
          content,
          startDate: startDate ? startDate.toISOString() : "",
          deadline: deadline ? deadline.toISOString() : "",
        },
        {
          onSuccess: (newTask) => {
            setTextMessage("Success");
          },
          onError: (error) => {
            setTextMessage("Error");
          },
        },
      );
    } catch (error) {
      setTextMessage(
        `Error creating announcement: ${(error as Error).message}`,
      );
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {/* Form Starts */}
      <form
        className="mb-4 w-2/6 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Task Title Field */}
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="task-title"
          >
            Task Title
          </label>

          <input
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            data-testid="admin-create-title"
            name="title"
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="taskTitle"
          >
            Task Content
          </label>
          <textarea
            data-testid="admin-create-content-input"
            name="content"
            placeholder="Content"
            value={taskData.content}
            onChange={handleInputChange}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 focus:border-blue-500 focus:outline-none"
            rows={4}
          />
        </div>

        {/* Date Picker Field (Start Date) */}
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="Startdate"
          >
            Start Date
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {startDate ? (
                  format(startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={setStartDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Date Picker (Deadline) */}
        <div className="mb-6">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="Deadline"
          >
            Deadline
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !deadline && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={deadline}
                onSelect={setDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {/* Add Task */}
          <Button className="bg-blue-500" type="submit">
            Add Task
          </Button>

          {/* Manage Task */}
          <Button>
            <Link href="view">Manage Task</Link>
          </Button>
        </div>
      </form>
      {textMessage && (
        <div
          className={`mb-4 ${textMessage.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
          data-testid="admin-create-message"
        >
          {textMessage}
        </div>
      )}
    </div>
  );
};

export default CreateTasks;
