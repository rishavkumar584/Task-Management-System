"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { clearAuthTokens, getAccessToken, getRefreshToken } from "@/lib/auth";
import { Task, TasksResponse } from "@/types/task";
import TaskForm from "@/components/task-form";
import TaskList from "@/components/task-list";
import { toast } from "sonner";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
const [loading, setLoading] = useState(true);
const [isRefreshing, setIsRefreshing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);


const fetchTasks = async (showFullLoader = false) => {
  try {
    if (showFullLoader) {
      setLoading(true);
    } else {
      setIsRefreshing(true);
    }

    const response = await api.get<{ data: TasksResponse }>("/tasks", {
      params: {
        page,
        limit,
        ...(status ? { status } : {}),
        ...(search ? { search } : {}),
      },
    });

    setTasks(response.data.data.tasks);
    setTotalPages(response.data.data.pagination.totalPages || 1);
  } catch (error: any) {
    toast.error(error?.response?.data?.message || "Failed to load tasks");
  } finally {
    setLoading(false);
    setIsRefreshing(false);
  }
};

  useEffect(() => {
    const token = getAccessToken();

    if (!token) {
      router.push("/login");
      return;
    }

    fetchTasks(true);
  }, [page, status, search]);

  const handleCreateTask = async (values: {
    title: string;
    description: string;
  }) => {
    try {
      await api.post("/tasks", values);
      toast.success("Task created successfully");
      fetchTasks();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create task");
    }
  };

  const handleUpdateTask = async (values: {
    title: string;
    description: string;
  }) => {
    if (!editingTask) return;

    try {
      await api.patch(`/tasks/${editingTask.id}`, values);
      toast.success("Task updated successfully");
      setEditingTask(null);
      fetchTasks();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to delete task");
    }
  };

  const handleToggleTask = async (taskId: string) => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      toast.success("Task status updated");
      fetchTasks();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to toggle task");
    }
  };

  const handleLogout = async () => {
    
    try {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        await api.post("/auth/logout", { refreshToken });
      }
    } catch {
    } finally {
      clearAuthTokens();
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-col gap-4 rounded-xl bg-white p-4 shadow-md md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold">Task Dashboard</h1>
          <button
            onClick={handleLogout}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <div className="grid gap-4 rounded-xl bg-white p-4 shadow-md md:grid-cols-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by title"
            className="rounded-lg border px-3 py-2 outline-none"
          />

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border px-3 py-2 outline-none"
          >
            <option value="">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="COMPLETED">Completed</option>
          </select>

          <button
            onClick={() => {
              setSearch(searchInput.trim());
              setPage(1);
            }}
            className="rounded-lg bg-black px-4 py-2 text-white"
          >
            Search
          </button>
        </div>

        <TaskForm
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          initialValues={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description || "",
                }
              : undefined
          }
          submitLabel={editingTask ? "Update Task" : "Add Task"}
        />

        {editingTask && (
          <button
            onClick={() => setEditingTask(null)}
            className="rounded-lg bg-gray-500 px-4 py-2 text-white"
          >
            Cancel Edit
          </button>
        )}

{isRefreshing && !loading && (
  <div className="flex justify-center">
    <div className="h-5 w-5 animate-spin rounded-full border-4 border-gray-400 border-t-transparent"></div>
  </div>
)}

        {loading ? (
          <div className="rounded-xl bg-white p-6 text-center shadow-md">
            <div className="flex justify-center py-6">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-black border-t-transparent"></div>
            </div>
          </div>
        ) : (
        
          <TaskList
            tasks={tasks}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
            onToggle={handleToggleTask}
          />
        )}

        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            className="rounded-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Previous
          </button>

          <span className="text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            className="rounded-lg bg-gray-300 px-4 py-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}