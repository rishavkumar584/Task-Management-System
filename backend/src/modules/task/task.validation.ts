import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title is too long"),
  description: z
    .string()
    .trim()
    .max(500, "Description is too long")
    .optional()
    .or(z.literal("")),
});

export const updateTaskSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(100, "Title is too long").optional(),
  description: z.string().trim().max(500, "Description is too long").optional(),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.enum(["PENDING", "COMPLETED"]).optional(),
  search: z.string().trim().optional(),
});

export const taskIdParamSchema = z.object({
  id: z.string().uuid("Invalid task id"),
});