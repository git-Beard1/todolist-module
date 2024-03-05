"use client";

import React from "react";
import Link from "next/link";
import { api } from "@/trpc/react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import toast, { Toaster } from "react-hot-toast";

const CreateTasks: React.FC = () => {
  const [taskData, setTaskData] = React.useState<{
    title: string;
    content: string;
    startDate: Date | string;
    deadline: Date | string;
  }>({ title: "", content: "", startDate: "", deadline: "" });

  const [textMessage, setTextMessage] = React.useState<string | null>(null);

  const createTask = api.task.createdTask.useMutation({
    onSuccess: (newTask) => {
      setTextMessage(`${newTask.title} task has been added`);
    },
    onError: (error) => {
      setTextMessage(`Error creating task: ${error.message}`);
    },
  });

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

    const { title, content, startDate, deadline } = taskData;

    if (!taskData.title || !taskData.content) {
      setTextMessage("Error: Please fill in both title and content.");
      return;
    }

    try {
      createTask.mutate({
        title,
        content,
        startDate:
          startDate instanceof Date ? startDate.toISOString() : startDate,
        deadline: 
          deadline instanceof Date ? deadline.toISOString() : deadline,
      });
      setTaskData({
        title: "",
        content: "",
        startDate: "",
        deadline: "",
      });
      setTextMessage(null);
    } catch (error) {
      setTextMessage(`Error creating task: ${(error as Error).message}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <h1>Creating Task</h1>

      {textMessage && (
        <div
          className={`mb-4 ${textMessage.startsWith("Error") ? "text-red-500" : "text-green-500"}`}
          data-testid="admin-create-message"
        >
          {textMessage}
        </div>
      )}

      {/* Form Starts */}
      <form
        className="mb-4 w-2/6 rounded bg-white px-8 pb-8 pt-6 shadow-md"
        onSubmit={handleSubmit}
      >
        {/* Task Title Field */}
        <div className="mb-4">
          <label
            className="mb-2 block text-sm font-bold text-gray-700"
            htmlFor="taskTitle"
          >
            Task Title
          </label>

          <input
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            id="username"
            type="text"
            placeholder="Task Title"
            value={taskData.title}
            onChange={handleInputChange}
          ></input>
        </div>

        <div className="mb-4">
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
                  !taskData.startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {taskData.startDate ? (
                  format(taskData.startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={taskData.startDate instanceof Date ? taskData.startDate : undefined}
                onSelect={(day) => {
                  if (day instanceof Date) {
                    {day}
                  }
                }}
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
                  !taskData.deadline && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {taskData.deadline ? format(taskData.deadline, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={taskData.deadline instanceof Date ? taskData.deadline : undefined}
                onSelect={(day) => {
                  if (day instanceof Date) {
                    {day}
                  }
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          {/* Add Task */}
          <Button className="bg-blue-500">Add Task</Button>

          {/* Manage Task */}
          <Button>Manage Task</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateTasks;
