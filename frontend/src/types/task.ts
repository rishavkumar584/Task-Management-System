export type TaskStatus = "PENDING" | "COMPLETED";

export type Task = {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

export type TasksResponse = {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};