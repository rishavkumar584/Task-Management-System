"use client";

import { Task } from "@/types/task";

type TaskListProps = {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => Promise<void>;
  onToggle: (taskId: string) => Promise<void>;
};

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggle,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-xl bg-white p-6 text-center shadow-md">
        <p className="text-gray-500">No tasks found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-xl bg-white p-4 shadow-md"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p className="mt-1 text-sm text-gray-600">
                {task.description || "No description"}
              </p>
              <span className="mt-3 inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium">
                {task.status}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onToggle(task.id)}
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white"
              >
                Toggle
              </button>
              <button
                onClick={() => onEdit(task)}
                className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}