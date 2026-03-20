import { prisma } from "../../config/prisma.js";

type CreateTaskInput = {
  title: string;
  description?: string;
  userId: string;
};

type UpdateTaskInput = {
  title?: string;
  description?: string;
  status?: "PENDING" | "COMPLETED";
};

type GetTasksInput = {
  userId: string;
  page: number;
  limit: number;
  status?: "PENDING" | "COMPLETED";
  search?: string;
};

export const createTask = async ({ title, description, userId }: CreateTaskInput) => {
  return prisma.task.create({
    data: {
      title,
      description: description || null,
      userId,
    },
  });
};

export const getTasks = async ({
  userId,
  page,
  limit,
  status,
  search,
}: GetTasksInput) => {
  const where = {
    userId,
    ...(status ? { status } : {}),
    ...(search
      ? {
          title: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),
  };

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getTaskById = async (id: string, userId: string) => {
  const task = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!task) {
    throw new Error("Task not found");
  }

  return task;
};

export const updateTask = async (id: string, userId: string, data: UpdateTaskInput) => {
  const existingTask = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  return prisma.task.update({
    where: { id },
    data: {
      ...(data.title !== undefined ? { title: data.title } : {}),
      ...(data.description !== undefined ? { description: data.description } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
    },
  });
};

export const deleteTask = async (id: string, userId: string) => {
  const existingTask = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  await prisma.task.delete({
    where: { id },
  });

  return { message: "Task deleted successfully" };
};

export const toggleTaskStatus = async (id: string, userId: string) => {
  const existingTask = await prisma.task.findFirst({
    where: { id, userId },
  });

  if (!existingTask) {
    throw new Error("Task not found");
  }

  const updatedTask = await prisma.task.update({
    where: { id },
    data: {
      status: existingTask.status === "PENDING" ? "COMPLETED" : "PENDING",
    },
  });

  return updatedTask;
};